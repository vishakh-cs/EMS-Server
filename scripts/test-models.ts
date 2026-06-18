import { GEMINI_API_KEY } from "../src/config";

const models = [
  "gemini-2.5-flash",
  "gemini-1.5-pro",
  "gemini-2.0-flash-lite-preview-02-05",
  "gemini-2.0-flash",
  "gemini-2.5-pro"
];

async function testModels() {
  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    const requestBody = {
      contents: [{ role: "user", parts: [{ text: "Search the web for the latest news about AI and return JSON." }] }],
      tools: [{ googleSearch: {} }]
    };
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`✅ ${model} works with Google Search!`);
        console.log(JSON.stringify(data).slice(0, 200));
        break;
      } else {
        console.log(`❌ ${model} failed: ${data.error?.message?.slice(0, 150)}`);
      }
    } catch (e: any) {
      console.log(`❌ ${model} failed with exception: ${e.message}`);
    }
  }
}

testModels();
