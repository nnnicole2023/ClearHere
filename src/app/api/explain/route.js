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
              Explain English phrases to new immigrants in 1-2 very short sentences.
              
              Rules:
              1. Use simplest words possible
              2. If it's a rule/sign, say what it means and what to do
              3. Maximum 2 sentences total
              4. No introductory phrases, just explain directly
              
              Examples:
              "Authorized Personnel Only" → "Only workers can enter. Don't go in if you don't work here."
              "No Trespassing" → "You cannot enter this property. Stay out."
              "Final Sale" → "You cannot return this after buying it."
            `.trim()
          },
          { role: "user", content: text },
        ],
      }),
    });

    const raw = await res.text();
    
    console.log("OpenRouter response status:", res.status);
    console.log("OpenRouter response body:", raw);
    
    if (!res.ok) {
      console.error("OpenRouter API error:", raw);
      return Response.json(
        { error: `API error: ${res.status}` },
        { status: 500 }
      );
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      console.error("Failed to parse API response:", raw);
      return Response.json(
        { error: "Invalid API response format" },
        { status: 500 }
      );
    }

    console.log("Parsed API data:", JSON.stringify(data, null, 2));
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error("No content in API response:", data);
      return Response.json(
        { error: "No content in API response" },
        { status: 500 }
      );
    }

    console.log("Content from API:", content);

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseErr) {
      console.error("Failed to parse explanation JSON:", content);
      // If it's not valid JSON, treat it as plain text
      parsed = { explanation: content };
    }

    // Handle case where API returns just a string value (quoted text)
    if (typeof parsed === 'string') {
      parsed = { explanation: parsed };
    }

    console.log("Final response:", JSON.stringify(parsed, null, 2));
    return Response.json(parsed);
  } catch (e) {
    console.error("API error:", e);
    return Response.json(
      { error: `Failed to generate explanation: ${e.message}` },
      { status: 500 }
    );
  }
}
