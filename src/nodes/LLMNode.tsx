import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Sparkles, Loader2 } from "lucide-react";

export default memo(function LLMNode({ data, selected }: NodeProps) {
    const isRunning = data.status === "running";
    const output = data.output || "";

    return (
        <div
            className={`min-w-[320px] rounded-lg border-2 bg-slate-800 shadow-xl transition-all ${selected ? "border-purple-500 shadow-purple-500/50" : "border-slate-700"
                } ${isRunning ? "animate-pulse ring-4 ring-purple-500/50" : ""}`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !border-2 !border-purple-500 !bg-purple-400"
                style={{ top: "30%" }}
                id="image"
            />
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !border-2 !border-purple-500 !bg-purple-400"
                style={{ top: "70%" }}
                id="text"
            />

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-700 bg-gradient-to-r from-purple-500 to-purple-600 px-3 py-2">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">LLM Node</span>
                {isRunning && <Loader2 className="ml-auto h-4 w-4 animate-spin text-white" />}
            </div>

            {/* Content */}
            <div className="p-3 space-y-3">
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-400">System Prompt</label>
                    <textarea
                        className="nodrag w-full resize-none rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        placeholder="You are a helpful assistant..."
                        rows={2}
                        defaultValue={data.systemPrompt || ""}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-400">User Message</label>
                    <textarea
                        className="nodrag w-full resize-none rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        placeholder="Enter your message..."
                        rows={2}
                        defaultValue={data.userMessage || ""}
                        disabled={data.hasTextInput}
                    />
                    {data.hasTextInput && (
                        <p className="mt-1 text-xs text-slate-500">Connected to text input</p>
                    )}
                </div>

                {output && (
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-400">Output</label>
                        <div className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white">
                            {output}
                        </div>
                    </div>
                )}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !border-2 !border-purple-500 !bg-purple-400"
            />
        </div>
    );
});
