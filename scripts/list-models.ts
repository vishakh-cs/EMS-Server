import { GEMINI_API_KEY } from "../src/config";

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.models) {
    console.log(JSON.stringify(data.models.map((m: any) => m.name), null, 2));
  } else {
    console.error(data);
  }
}

listModels();
