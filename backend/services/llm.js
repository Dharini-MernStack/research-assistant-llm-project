const Groq = require("groq-sdk");

async function askLLM(contextText, question) {
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You are a research assistant. Answer ONLY using the provided document content. If answer is not in document, say 'Not found in document.'",
      },
      {
        role: "user",
        content: `Document Content:\n${contextText}\n\nQuestion:\n${question}`,
      },
    ],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}

module.exports = { askLLM };
