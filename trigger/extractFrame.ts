import { task } from "@trigger.dev/sdk/v3";

export const extractFrameTask = task({
    id: "extract-frame-task",
    run: async (payload: {
        videoUrl: string;
        timestamp: number;
        format: string;
    }) => {
        try {
            // In production, this would use FFmpeg via Trigger.dev
            // For now, we'll return a placeholder

            console.log("Extracting frame from video:", payload);

            // Simulate processing time
            await new Promise((resolve) => setTimeout(resolve, 2000));

            return {
                success: true,
                output: {
                    frameImageUrl: payload.videoUrl, // In production, this would be the extracted frame URL
                    timestamp: payload.timestamp,
                    format: payload.format,
                },
            };
        } catch (error) {
            console.error("Extract frame task error:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    },
});
