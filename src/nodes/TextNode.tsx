import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Type } from "lucide-react";

export default memo(function TextNode({ data, selected }: NodeProps) {
    const status = data?.status;
    const isRunning = status === "running";
    const isError = status === "failed" || status === "error";
    return (
        <div
            className={`min-w-[280px] rounded-md border bg-[#1a1f2b] transition-colors ${
                selected ? "border-violet-400" : "border-white/10"
            } ${isRunning ? "ring-1 ring-violet-400/30" : ""} ${isError ? "border-red-400/60" : ""}`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#1a1f2b] px-3 py-2">
                <Type className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-200">Text</span>
            </div>

            {/* Content */}
            <div className="p-3">
                <textarea
                    className="nodrag w-full resize-none rounded-md border border-white/10 bg-[#0f1319] px-2 py-1.5 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-400/30"
                    placeholder="Enter text..."
                    rows={3}
                    defaultValue={data.text || ""}
                />
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
