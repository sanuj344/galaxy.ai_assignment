import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Crop } from "lucide-react";

export default memo(function CropImageNode({ data, selected }: NodeProps) {
    return (
        <div
            className={`min-w-[280px] rounded-lg border-2 bg-slate-800 shadow-xl transition-all ${selected ? "border-pink-500 shadow-pink-500/50" : "border-slate-700"
                }`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !border-2 !border-pink-500 !bg-pink-400"
            />

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-700 bg-gradient-to-r from-pink-500 to-pink-600 px-3 py-2">
                <Crop className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Crop Image</span>
            </div>

            {/* Content */}
            <div className="p-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-400">X Position</label>
                        <input
                            type="number"
                            className="nodrag w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                            placeholder="0"
                            defaultValue={data.x || 0}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-400">Y Position</label>
                        <input
                            type="number"
                            className="nodrag w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                            placeholder="0"
                            defaultValue={data.y || 0}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-400">Width</label>
                        <input
                            type="number"
                            className="nodrag w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                            placeholder="100"
                            defaultValue={data.width || 100}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-400">Height</label>
                        <input
                            type="number"
                            className="nodrag w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                            placeholder="100"
                            defaultValue={data.height || 100}
                        />
                    </div>
                </div>
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !border-2 !border-pink-500 !bg-pink-400"
            />
        </div>
    );
});
