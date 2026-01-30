import { memo, useState, useRef } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Image, Upload, Loader2 } from "lucide-react";
import { uploadToTransloadit, validateImageFile } from "@/lib/transloadit";

export default memo(function UploadImageNode({ data, selected }: NodeProps) {
    const [preview, setPreview] = useState<string | null>(data.imageUrl || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setError(null);
            setUploading(true);
            validateImageFile(file);
            const result = await uploadToTransloadit(file, "image");
            setPreview(result.url);
            // Update node data
            data.imageUrl = result.url;
            data.fileName = result.name;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className={`min-w-[280px] rounded-lg border-2 bg-slate-800 shadow-xl transition-all ${selected ? "border-green-500 shadow-green-500/50" : "border-slate-700"
                }`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-700 bg-gradient-to-r from-green-500 to-green-600 px-3 py-2">
                <Image className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Upload Image</span>
                {uploading && <Loader2 className="ml-auto h-4 w-4 animate-spin text-white" />}
            </div>

            {/* Content */}
            <div className="p-3">
                {preview ? (
                    <div className="relative">
                        <img src={preview} alt="Preview" className="h-32 w-full rounded-md object-cover" />
                        <button
                            onClick={() => {
                                setPreview(null);
                                data.imageUrl = null;
                            }}
                            className="absolute right-2 top-2 rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex h-32 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-600 bg-slate-900 text-slate-400 transition-colors hover:border-green-500 hover:text-green-500 disabled:opacity-50"
                    >
                        {uploading ? (
                            <Loader2 className="mb-2 h-8 w-8 animate-spin" />
                        ) : (
                            <Upload className="mb-2 h-8 w-8" />
                        )}
                        <span className="text-xs">{uploading ? "Uploading..." : "Click to upload"}</span>
                    </button>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !border-2 !border-green-500 !bg-green-400"
            />
        </div>
    );
});
