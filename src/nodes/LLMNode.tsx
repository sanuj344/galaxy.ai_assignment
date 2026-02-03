import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";

export default memo(function LLMNode({ data, selected }: NodeProps) {
    const isRunning = data.status === "running";
    const isError = data.status === "failed" || data.status === "error";
    const output = data.output || "";
    const [isOutputExpanded, setIsOutputExpanded] = useState(!!output);

    return (
        <div
            className={`min-w-[300px] rounded-md border bg-[#1a1f2b] transition-colors ${
                selected ? "border-violet-400" : "border-white/10"
            } ${isRunning ? "ring-1 ring-violet-400/30" : ""} ${isError ? "border-red-400/60" : ""}`}
        >
            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-2 !w-2 !border !border-[#0b0f14] !bg-violet-400"
                style={{ top: "30%" }}
                id="image"
            />
            <Handle
                type="target"
                position={Position.Left}
                className="!h-2 !w-2 !border !border-[#0b0f14] !bg-violet-400"
                style={{ top: "70%" }}
                id="text"
            />

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#1a1f2b] px-3 py-2">
                <Sparkles className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-200">LLM</span>
                {isRunning && <Loader2 className="ml-auto h-3 w-3 animate-spin text-indigo-400" />}
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
                <div>
                    <label className="mb-1 block text-[10px] font-medium text-gray-400 uppercase">System Prompt</label>
                    <textarea
                        className="nodrag w-full resize-none rounded-md border border-white/10 bg-[#0f1319] px-2 py-1 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-400/30"
                        placeholder="You are..."
                        rows={2}
                        defaultValue={data.systemPrompt || ""}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-[10px] font-medium text-gray-400 uppercase">Message</label>
                    <textarea
                        className="nodrag w-full resize-none rounded-md border border-white/10 bg-[#0f1319] px-2 py-1 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-400/30 disabled:opacity-50"
                        placeholder="Your message..."
                        rows={2}
                        defaultValue={data.userMessage || ""}
                        disabled={data.hasTextInput}
                    />
                    {data.hasTextInput && (
                        <p className="mt-1 text-[10px] text-gray-500">Connected to text</p>
                    )}
                </div>

                {output && (
                    <div className="border-t border-white/10 pt-2">
                        <button
                            onClick={() => setIsOutputExpanded(!isOutputExpanded)}
                            className="flex items-center justify-between w-full gap-1 text-[10px] font-medium text-violet-300 mb-1"
                        >
                            Output
                            {isOutputExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>
                        {isOutputExpanded && (
                            <div className="rounded-md bg-[#0f1319] px-2 py-1 text-[10px] text-gray-300 max-h-20 overflow-y-auto border border-white/10">
                                {output}
                            </div>
                        )}
                    </div>
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
