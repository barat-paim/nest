import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { prompt, responseType } = await req.json(); // Extract the user prompt and response type (text or speech)

  try {
    // Handle text completion
    if (responseType === "text") {
      console.log('user selected text mode');
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Use GPT-4 model for text completion
        messages: [
          { role: "system", content: "You are concise and direct with diplomatic efficiency to get to the point." },
          { role: "assistant", content: "Compose an email in 140 characters or less. Use a sophisticated, british-accented, and slightly sarcastic tone."},
          { role: "user", content: prompt },
        ],
      });

      const textResponse = completion.choices[0].message.content;
      console.log('Text completion generated:', textResponse);
      return new Response(textResponse, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Handle speech generation
    if (responseType === "voice") {
      console.log('user selected voice mode');
      const voiceResponse = await openai.audio.speech.create({
        model: "tts-1", // Text-to-speech model
        voice: "alloy", // Choose the voice model
        input: prompt,  // Use the prompt for speech synthesis
      });

      const arrayBuffer = await voiceResponse.arrayBuffer();
      const audioStream = new ReadableStream({
        start(controller) {
            controller.enqueue(new Uint8Array(arrayBuffer));
            controller.close();
        }
      });
      return new Response(audioStream, {
        headers: { "Content-Type": "audio/mpeg" },
      });
    }

    return new Response("Invalid response type", { status: 400 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
