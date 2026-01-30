import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Video, Upload } from "lucide-react";

export default memo(function UploadVideoNode({ data, selected }: NodeProps) {
    const [preview, setPreview] = useState<string | null>(data.videoUrl || null);

    return (
        <div
            className={`min-w-[280px] rounded-lg border-2 bg-slate-800 shadow-xl transition-all ${selected ? "border-amber-500 shadow-amber-500/50" : "border-slate-700"
                }`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-700 bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-2">
                <Video className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Upload Video</span>
            </div>

            {/* Content */}
            <div className="p-3">
                {preview ? (
                    <div className="relative">
                        <video src={preview} className="h-32 w-full rounded-md object-cover" controls />
                        <button
                            onClick={() => setPreview(null)}
                            className="absolute right-2 top-2 rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="flex h-32 flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-600 bg-slate-900 text-slate-400 hover:border-amber-500 hover:text-amber-500">
                        <Upload className="mb-2 h-8 w-8" />
                        <span className="text-xs">Click to upload</span>
                    </div>
                )}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !border-2 !border-amber-500 !bg-amber-400"
            />
        </div>
    );
});
