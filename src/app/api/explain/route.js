// src/app/api/explain/route.js
export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return Response.json({ error: "Empty input" }, { status: 400 });
    }

    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
      return Response.json({ error: "Missing API key" }, { status: 500 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `
You are an English helper.

Return ONLY valid JSON in this format:
{
  "explanation": "1–2 simple sentences",
  "quiz": {
    "question": "one multiple-choice question about the meaning",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A"
  }
}

Rules:
- options must be exactly 4 items
- correctAnswer must be A, B, C, or D
- No markdown, no extra text
            `.trim(),
          },
          { role: "user", content: text },
        ],
      }),
    });

    const raw = await res.text();
    const data = JSON.parse(raw);
    const content = data.choices?.[0]?.message?.content;

    const parsed = JSON.parse(content);

    return Response.json(parsed);
  } catch (e) {
    return Response.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
