import { memo, useState, useRef } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Image as ImageIcon, Loader2, X } from "lucide-react";
import { uploadToTransloadit, validateImageFile } from "@/lib/transloadit";

export default memo(function UploadImageNode({ data, selected }: NodeProps) {
    const [preview, setPreview] = useState<string | null>(data.imageUrl || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const status = data?.status;
    const isRunning = status === "running";
    const isErrorState = status === "failed" || status === "error";

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setError(null);
            setUploading(true);
            validateImageFile(file);
            const result = await uploadToTransloadit(file, "image");
            setPreview(result.url);
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
            className={`min-w-[280px] rounded-md border bg-[#1a1f2b] transition-colors ${
                selected ? "border-violet-400" : "border-white/10"
            } ${isRunning ? "ring-1 ring-violet-400/30" : ""} ${isErrorState ? "border-red-400/60" : ""}`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#1a1f2b] px-3 py-2">
                <ImageIcon className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-200">Upload Image</span>
                {uploading && <Loader2 className="ml-auto h-3 w-3 animate-spin text-violet-300" />}
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
                {preview ? (
                    <div className="relative group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-auto rounded-md border border-white/10"
                        />
                        <button
                            onClick={() => {
                                setPreview(null);
                                if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="absolute top-1 right-1 rounded-md bg-gray-900/80 p-1 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="nodrag hidden"
                            id="upload-image-input"
                        />
                        <label
                            htmlFor="upload-image-input"
                            className="block cursor-pointer rounded-md border border-dashed border-white/20 bg-[#0f1319] py-3 text-center text-xs text-gray-400 transition-colors hover:border-violet-400/40 hover:bg-white/5"
                        >
                            {uploading ? "Uploading..." : "Click to upload"}
                        </label>
                    </>
                )}
                {error && (
                    <p className="text-[10px] text-red-400">{error}</p>
                )}
                {data.fileName && (
                    <p className="text-[10px] text-gray-500">{data.fileName}</p>
                )}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-2 !w-2 !border !border-[#0b0f14] !bg-violet-400"
            />
        </div>
    );
});
