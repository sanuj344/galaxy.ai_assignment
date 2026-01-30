import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Type } from "lucide-react";

export default memo(function TextNode({ data, selected }: NodeProps) {
    return (
        <div
            className={`min-w-[280px] rounded-lg border-2 bg-slate-800 shadow-xl transition-all ${selected ? "border-blue-500 shadow-blue-500/50" : "border-slate-700"
                }`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-700 bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2">
                <Type className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Text Input</span>
            </div>

            {/* Content */}
            <div className="p-3">
                <textarea
                    className="nodrag w-full resize-none rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter text..."
                    rows={4}
                    defaultValue={data.text || ""}
                />
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !border-2 !border-blue-500 !bg-blue-400"
            />
        </div>
    );
});
