import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    // ✅ use the correct endpoint + model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

    const prompt = `
    Create a list of three open-ended and engaging questions formatted as a single string.
    Each question should be separated by '||'. 
    These questions are for an anonymous social messaging platform (like Qooh.me), suitable for a general audience.
    Avoid personal, sensitive, or controversial topics.
    Example good questions:
    "What is something new you've learned recently?" ||
    "If you could travel anywhere in the world, where would you go and why?" ||
    "What's a hobby or activity you've always wanted to try but haven't yet?"
    Only return the list of questions, no extra text.
    `;

    // ✅ correct usage for Gemini SDK
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text();

    return new Response(JSON.stringify({ suggestions: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Something went wrong",
      }),
      { status: 500 }
    );
  }
}
