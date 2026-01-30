import { task } from "@trigger.dev/sdk/v3";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runLLMTask = task({
    id: "run-llm-task",
    run: async (payload: {
        systemPrompt: string;
        userMessage: string;
        imageUrl?: string;
    }) => {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            let parts: any[] = [{ text: payload.userMessage }];

            // If image is provided, include it
            if (payload.imageUrl) {
                // In production, fetch the image and convert to base64
                // For now, we'll just use text
                parts.push({ text: `[Image URL: ${payload.imageUrl}]` });
            }

            const result = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts,
                    },
                ],
                systemInstruction: payload.systemPrompt,
            });

            const response = result.response;
            const text = response.text();

            return {
                success: true,
                output: text,
            };
        } catch (error) {
            console.error("LLM task error:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    },
});
