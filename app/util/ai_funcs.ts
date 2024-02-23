import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// "Fix any note you get. Rewrite it properly from what you understood. If there's any grammatical error, fix it."
export async function generateWiseNote(userMessage : String) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "Imagine yourself as an assistant that helps refining notes given by your boss. your boss might give vague notes. Imagine the context and rewrite it formally."
        },
        {
          "role": "user",
          "content": ` Here is the loose note the boss gave you: ${userMessage} \n Rewrite it wisely. Just rewrite it as a note that fits in a to do list, provide just the reworded note itself`
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I couldn't generate a response at the moment.";
  }
}