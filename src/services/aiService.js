// src/services/aiService.js

export async function generateEmail({ recipient, purpose, tone, keyPoints }) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;

  // Build the prompt
  const prompt = `
    Generate a ${tone} email to ${recipient} about ${purpose}.
    Include these key points: ${keyPoints}.
    Format the output clearly with line breaks between paragraphs.
    Return:
    Subject: [subject line]
    Body:
    [well‑formatted email body]
    `;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Gemini raw response:", data);

    // Extract the text from Gemini response
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Split into subject and body
    const [subjectLine, ...bodyLines] = output.split("\n");
    const subject = subjectLine.replace(/^Subject:\s*/i, "").trim();
    const bodyText = bodyLines.join("\n").trim();

    return { subject, body: bodyText };
  } catch (error) {
    console.error("Error generating email:", error);
    return {
      subject: "Error",
      body: "Sorry, something went wrong while generating the email.",
    };
  }
}
