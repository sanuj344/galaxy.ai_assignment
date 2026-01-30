// Transloadit upload utility
// Note: This is a simplified version. In production, you would use actual Transloadit credentials

export interface UploadResult {
    url: string;
    name: string;
    size: number;
    type: string;
}

export async function uploadToTransloadit(
    file: File,
    type: "image" | "video"
): Promise<UploadResult> {
    // In production, this would use Transloadit API
    // For now, we'll use a local file URL for preview

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            // Simulate upload delay
            setTimeout(() => {
                resolve({
                    url: reader.result as string,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                });
            }, 1000);
        };

        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };

        reader.readAsDataURL(file);
    });
}

export function validateImageFile(file: File): boolean {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        throw new Error("Invalid image type. Supported: JPEG, PNG, GIF, WebP");
    }

    if (file.size > maxSize) {
        throw new Error("Image too large. Maximum size: 10MB");
    }

    return true;
}

export function validateVideoFile(file: File): boolean {
    const validTypes = ["video/mp4", "video/webm", "video/quicktime"];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!validTypes.includes(file.type)) {
        throw new Error("Invalid video type. Supported: MP4, WebM, MOV");
    }

    if (file.size > maxSize) {
        throw new Error("Video too large. Maximum size: 100MB");
    }

    return true;
}
