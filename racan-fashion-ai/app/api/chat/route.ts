import { GoogleGenerativeAI } from "@google/generative-ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI("AIzaSyDEPWWTnNkcpoyUZt83TKhiALrEusOPKWE")

export async function POST(req: Request) {
  const { messages, image } = await req.json()

  try {
    // Use gemini-1.5-flash which has higher free tier limits
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: {
        parts: [
          {
            text: "You are a friendly fashion expert who loves helping people with style, beauty, and skincare. Respond naturally and conversationally, like you're chatting with a close friend. Keep responses short and casual - around 15-25 words max. Be warm, helpful, and human-like. Don't mention being an AI. For simple greetings like 'hi' or 'hello', just respond casually like a friend would.",
          },
        ],
        role: "system",
      },
    })

    // Filter out the initial assistant greeting and get conversation history
    const conversationHistory = messages
      .filter(
        (msg: any) =>
          !(msg.role === "assistant" && msg.content.includes("Hi! I'm here to help you with all things fashion")),
      )
      .map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }))

    // Get the latest user message
    const latestMessage = conversationHistory[conversationHistory.length - 1]
    const historyWithoutLast = conversationHistory.slice(0, -1)

    // Create a chat session with reduced token limits
    const chat = model.startChat({
      history: historyWithoutLast,
      generationConfig: {
        temperature: 0.8,
        topK: 20,
        topP: 0.8,
        maxOutputTokens: 256, // Reduced for shorter responses
      },
    })

    let result
    if (image) {
      // Handle image input
      const imagePart = {
        inlineData: {
          data: image.split(",")[1], // Remove data:image/jpeg;base64, prefix
          mimeType: image.split(";")[0].split(":")[1],
        },
      }

      result = await chat.sendMessage([{ text: latestMessage.parts[0].text }, imagePart])
    } else {
      // Handle text-only input
      result = await chat.sendMessage(latestMessage.parts[0].text)
    }

    const response = result.response

    return new Response(JSON.stringify({ text: response.text() }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error generating response:", error)

    // Handle specific quota exceeded error
    if (error.message?.includes("exceeded your current quota") || error.message?.includes("429")) {
      return new Response(
        JSON.stringify({
          text: "I'm getting a lot of requests right now! Give me about 30 seconds and then we can continue chatting about your style questions. 😊",
          error: "quota_exceeded",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "30",
          },
        },
      )
    }

    return new Response(
      JSON.stringify({
        text: "Oops, something went wrong on my end! Let's try that again - what fashion, beauty, or skincare question can I help you with?",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
