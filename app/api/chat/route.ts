import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { messages, vaultData } = await req.json();
    
    const lastMessage = messages[messages.length - 1];
    const userQuestion = lastMessage?.content || "";

    // Check if API key is configured
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      // Return error message asking for API key
      const errorResponse = `⚠️ **Gemini API Key Required**\n\nTo use the AI Twin chat, please:\n\n1. Get a free API key from https://aistudio.google.com/app/apikey\n2. Add it to your .env.local file:\n   \`GOOGLE_GENERATIVE_AI_API_KEY=your-key-here\`\n3. Restart your dev server\n\nFor now, I can show you what's in your vault:\n\n**You have ${vaultData.length} items:**\n${vaultData.slice(0, 5).map((item: any, i: number) => `${i + 1}. ${item.title} (${item.category})`).join('\n')}`;
      
      return createStreamResponse(errorResponse);
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build context from vault data
    let vaultContext = `You are the user's AI Twin assistant. You have access to their personal vault with ${vaultData.length} items:\n\n`;
    
    vaultData.forEach((item: any, index: number) => {
      vaultContext += `${index + 1}. [${item.category}] ${item.title}\n`;
      if (item.text) {
        vaultContext += `   Content: ${item.text.substring(0, 200)}\n`;
      }
      if (item.contentUrl) {
        vaultContext += `   URL: ${item.contentUrl}\n`;
      }
      if (item.tags && item.tags.length > 0) {
        vaultContext += `   Tags: ${item.tags.join(", ")}\n`;
      }
      vaultContext += `\n`;
    });

    vaultContext += `\nBe helpful and conversational. Reference specific items from the vault when relevant. Answer questions about the vault contents, help find information, and provide summaries when asked.`;

    // Create chat with context
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: vaultContext }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm your AI Twin and I have access to your vault with all your notes, links, media, and tasks. How can I help you today?" }],
        },
      ],
    });

    // Send user's question
    const result = await chat.sendMessage(userQuestion);
    const response = result.response.text();

    return createStreamResponse(response);

  } catch (error: any) {
    console.error("Chat API error:", error);
    const errorMsg = `❌ Error: ${error.message || 'Failed to process chat request'}`;
    return createStreamResponse(errorMsg);
  }
}

// Helper function to create streaming response
function createStreamResponse(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Escape special characters for JSON
      const escapedText = text
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      
      // Send as Vercel AI SDK format
      const chunk = `0:"${escapedText}"\n`;
      controller.enqueue(encoder.encode(chunk));
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Vercel-AI-Data-Stream': 'v1',
    },
  });
}
