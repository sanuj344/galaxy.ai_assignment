import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Film } from "lucide-react";

export default memo(function ExtractFrameNode({ data, selected }: NodeProps) {
    const status = data?.status;
    const isRunning = status === "running";
    const isError = status === "failed" || status === "error";
    return (
        <div
            className={`min-w-[280px] rounded-md border bg-[#1a1f2b] transition-colors ${
                selected ? "border-violet-400" : "border-white/10"
            } ${isRunning ? "ring-1 ring-violet-400/30" : ""} ${isError ? "border-red-400/60" : ""}`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-2 !w-2 !border !border-[#0b0f14] !bg-violet-400"
            />

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#1a1f2b] px-3 py-2">
                <Film className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-200">Extract Frame</span>
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
                <div>
                    <label className="mb-1 block text-[10px] font-medium text-gray-400 uppercase">Timestamp (sec)</label>
                    <input
                        type="number"
                        step="0.1"
                        className="nodrag w-full rounded-md border border-white/10 bg-[#0f1319] px-2 py-1 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-400/30"
                        placeholder="0.0"
                        defaultValue={data.timestamp || 0}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-[10px] font-medium text-gray-400 uppercase">Format</label>
                    <select
                        className="nodrag w-full rounded-md border border-white/10 bg-[#0f1319] px-2 py-1 text-xs text-gray-100 transition-all focus:outline-none focus:ring-1 focus:ring-violet-400/30 cursor-pointer"
                        defaultValue={data.format || "jpg"}
                    >
                        <option value="jpg" className="bg-[#12141a]">JPEG</option>
                        <option value="png" className="bg-[#12141a]">PNG</option>
                        <option value="webp" className="bg-[#12141a]">WebP</option>
                    </select>
                </div>
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
