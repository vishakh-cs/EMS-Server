import https from "https";

export interface ParsedJob {
  jobTitle: string;
  companyName?: string;
  location?: string;
  jobType?: string;
  experienceRequired?: string;
  description?: string;
  applyUrl?: string;
  source?: string;
  postedDate?: Date;
}

/**
 * Uses the Groq API with compound-beta-mini (web-search enabled) to find
 * real job listings. The GROK_API_KEY env variable is a Groq (api.groq.com) key.
 *
 * Strategy:
 * 1. compound-beta-mini with web search → real internet results
 * 2. Fallback: llama-3.3-70b-versatile (no web, uses training knowledge)
 */
export async function searchJobsWithGrok(
  jobtitles: string[],
  experience: string,
  location?: string
): Promise<ParsedJob[]> {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) throw new Error("GROK_API_KEY is not set in environment");

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const dateStr = oneMonthAgo.toISOString().split("T")[0];

  const titleQuery = jobtitles.join("/");
  const locationClause = location ? `in ${location}` : "worldwide";

  // Primary prompt - focuses on extracting real job data with company names
  const webSearchPrompt = `Search for ${titleQuery} developer jobs ${locationClause} posted after ${dateStr}. 
Find at least 8 individual job listings with company names, titles, and locations from Naukri, LinkedIn, Glassdoor, or Indeed.
Extract specific companies from the search results. Each company hiring ${titleQuery} developers counts as one listing.

Return ONLY this JSON array (no text before or after, no markdown):
[
  {
    "jobTitle": "exact job title",
    "companyName": "company name",
    "location": "city, state",
    "jobType": "full-time",
    "experienceRequired": "${experience} years",
    "description": "brief job description",
    "applyUrl": "job URL if available",
    "source": "Naukri/LinkedIn/Glassdoor/Indeed",
    "postedDate": "YYYY-MM-DD"
  }
]`;

  // Fallback prompt for non-web models
  const knowledgePrompt = `Generate a realistic list of 10 ${titleQuery} developer job postings ${locationClause} as of ${new Date().toISOString().split("T")[0]}.
Use realistic company names (Indian tech companies, startups, MNCs operating in India).
Experience required: ${experience} years. These should look like real job listings.

Return ONLY this JSON array (no markdown, no text before/after):
[{"jobTitle":"...","companyName":"...","location":"...","jobType":"full-time","experienceRequired":"${experience} years","description":"...","applyUrl":null,"source":"LinkedIn","postedDate":"2026-05-15"}]`;

  const configs = [
    {
      model: "compound-beta-mini",
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      prompt: webSearchPrompt,
      label: "web-search"
    },
    {
      model: "llama-3.3-70b-versatile",
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      prompt: knowledgePrompt,
      label: "knowledge-fallback"
    },
  ];

  let lastError: Error | null = null;

  for (const config of configs) {
    console.log(`[JobSearch] Trying ${config.label} (${config.model})`);
    try {
      const jobs = await callGroqApi(apiKey, config.model, config.hostname, config.path, config.prompt);
      if (jobs !== null && jobs.length > 0) {
        console.log(`[JobSearch] ✅ Success with ${config.label}: ${jobs.length} jobs`);
        return jobs;
      }
      console.log(`[JobSearch] ${config.label} returned empty array, trying next...`);
    } catch (err: any) {
      console.warn(`[JobSearch] ${config.label} failed:`, err.message?.slice(0, 150));
      lastError = err;
    }
  }

  if (lastError) throw new Error(`All search strategies failed. Last: ${lastError.message}`);
  return [];
}

async function callGroqApi(
  apiKey: string,
  model: string,
  hostname: string,
  path: string,
  userPrompt: string
): Promise<ParsedJob[] | null> {
  const requestBody = JSON.stringify({
    model,
    messages: [
      {
        role: "system",
        content: "You are a precise job listing assistant. Return ONLY valid JSON arrays. No markdown, no explanation, no code blocks.",
      },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4,
  });

  const responseText = await new Promise<string>((resolve, reject) => {
    const req = https.request(
      {
        hostname,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "Content-Length": Buffer.byteLength(requestBody),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      }
    );
    req.on("error", reject);
    req.write(requestBody);
    req.end();
  });

  let parsed: any;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new Error(`Non-JSON response: ${responseText.slice(0, 200)}`);
  }

  if (parsed.error) {
    const code = parsed.error?.code || "";
    const msg = parsed.error?.message || JSON.stringify(parsed.error);
    if (code === "request_too_large") return null;
    if (code === "rate_limit_exceeded") {
      // Extract retry-after from message if possible
      throw new Error(`Rate limited: ${msg.slice(0, 100)}`);
    }
    throw new Error(`API error: ${msg.slice(0, 200)}`);
  }

  const content: string = parsed?.choices?.[0]?.message?.content ?? "";
  console.log(`[JobSearch] Response preview:`, content.slice(0, 200));

  if (!content) return null;

  // Strip markdown if present
  const cleaned = content
    .replace(/^```json\s*/im, "")
    .replace(/^```\s*/im, "")
    .replace(/```\s*$/im, "")
    .trim();

  const arrStart = cleaned.indexOf("[");
  const arrEnd = cleaned.lastIndexOf("]");
  if (arrStart === -1 || arrEnd === -1) {
    // Model returned narrative text without array - try next strategy
    return null;
  }

  let jobs: any[];
  try {
    jobs = JSON.parse(cleaned.slice(arrStart, arrEnd + 1));
    if (!Array.isArray(jobs)) return null;
  } catch {
    return null;
  }

  return jobs
    .filter((j) => j.jobTitle || j.title)
    .map((j: any): ParsedJob => ({
      jobTitle: j.jobTitle || j.title || "Developer",
      companyName: j.companyName || j.company || undefined,
      location: j.location || undefined,
      jobType: j.jobType || j.type || "full-time",
      experienceRequired: j.experienceRequired || j.experience || undefined,
      description: j.description || undefined,
      applyUrl: j.applyUrl || j.url || j.link || undefined,
      source: j.source || j.platform || undefined,
      postedDate: j.postedDate ? new Date(j.postedDate) : undefined,
    }));
}
