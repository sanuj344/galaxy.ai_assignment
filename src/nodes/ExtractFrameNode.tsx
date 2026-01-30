import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Film } from "lucide-react";

export default memo(function ExtractFrameNode({ data, selected }: NodeProps) {
    return (
        <div
            className={`min-w-[280px] rounded-lg border-2 bg-slate-800 shadow-xl transition-all ${selected ? "border-cyan-500 shadow-cyan-500/50" : "border-slate-700"
                }`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !border-2 !border-cyan-500 !bg-cyan-400"
            />

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-700 bg-gradient-to-r from-cyan-500 to-cyan-600 px-3 py-2">
                <Film className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Extract Frame</span>
            </div>

            {/* Content */}
            <div className="p-3 space-y-3">
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-400">
                        Timestamp (seconds)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        className="nodrag w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        placeholder="0.0"
                        defaultValue={data.timestamp || 0}
                    />
                    <p className="mt-1 text-xs text-slate-500">Extract frame at this time</p>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-400">Format</label>
                    <select
                        className="nodrag w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        defaultValue={data.format || "jpg"}
                    >
                        <option value="jpg">JPEG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                    </select>
                </div>
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !border-2 !border-cyan-500 !bg-cyan-400"
            />
        </div>
    );
});
