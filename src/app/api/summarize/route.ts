import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Aucun contenu fourni." }, { status: 400 });
    }

    // Utilisation du prompt IA fourni
    const prompt = `Simplify this contract in plain language, without legal jargon:\n\n${content}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an assistant that summarizes contracts and documents in simple, plain language.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ error: "Erreur OpenAI: " + error }, { status: res.status });
    }

    const data = await res.json();
    const summary = data.choices?.[0]?.message?.content;

    if (!summary) {
      return NextResponse.json({ error: "Aucun résumé généré." }, { status: 500 });
    }

    return NextResponse.json({ summary });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Erreur lors du résumé : " + message }, { status: 500 });
  }
}
