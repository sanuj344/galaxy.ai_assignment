import { task } from "@trigger.dev/sdk/v3";

export const cropImageTask = task({
    id: "crop-image-task",
    run: async (payload: {
        imageUrl: string;
        x: number;
        y: number;
        width: number;
        height: number;
    }) => {
        try {
            // In production, this would use FFmpeg via Trigger.dev
            // For now, we'll return a placeholder

            console.log("Cropping image:", payload);

            // Simulate processing time
            await new Promise((resolve) => setTimeout(resolve, 2000));

            return {
                success: true,
                output: {
                    croppedImageUrl: payload.imageUrl, // In production, this would be the cropped image URL
                    dimensions: {
                        x: payload.x,
                        y: payload.y,
                        width: payload.width,
                        height: payload.height,
                    },
                },
            };
        } catch (error) {
            console.error("Crop image task error:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    },
});
