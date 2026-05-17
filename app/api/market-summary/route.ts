export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json({
      summary: "OpenAI API key is missing. Check .env.local.",
    });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content:
            "Write a short beginner-friendly market summary under 70 words. Mention markets can change quickly. Do not give financial advice.",
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return Response.json({
      summary: `OpenAI error: ${data.error?.message || "Unknown error"}`,
    });
  }

  return Response.json({
    summary: data.choices?.[0]?.message?.content || "No summary returned.",
  });
}