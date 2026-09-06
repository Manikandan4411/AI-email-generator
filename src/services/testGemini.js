// testGemini.js
import fetch from "node-fetch"; // install with: npm install node-fetch

const API_KEY = process.env.VITE_GEMINI_API_KEY || "your_key";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;


const body = {
  contents: [{ parts: [{ text: "Hello Gemini from VS Code" }] }],
};

async function testGemini() {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log("Gemini response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

testGemini();
