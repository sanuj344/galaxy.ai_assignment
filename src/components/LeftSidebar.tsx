"use client";

import { useState } from "react";
import { Type, Image, Video, Sparkles, Crop, Film, ChevronLeft, ChevronRight } from "lucide-react";
import { useWorkflowStore } from "@/store/workflowStore";

const nodeTypes = [
    { type: "text", label: "Text", icon: Type, color: "from-blue-500 to-blue-600" },
    { type: "upload-image", label: "Upload Image", icon: Image, color: "from-green-500 to-green-600" },
    { type: "upload-video", label: "Upload Video", icon: Video, color: "from-amber-500 to-amber-600" },
    { type: "llm", label: "LLM", icon: Sparkles, color: "from-purple-500 to-purple-600" },
    { type: "crop-image", label: "Crop Image", icon: Crop, color: "from-pink-500 to-pink-600" },
    { type: "extract-frame", label: "Extract Frame", icon: Film, color: "from-cyan-500 to-cyan-600" },
];

export default function LeftSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { addNode, nodes } = useWorkflowStore();

    const handleAddNode = (type: string, label: string) => {
        const newNode = {
            id: `${type}-${Date.now()}`,
            type,
            position: {
                x: Math.random() * 400 + 100,
                y: Math.random() * 400 + 100,
            },
            data: { label },
        };
        addNode(newNode);
    };

    return (
        <div
            className={`relative flex h-full flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"
                }`}
        >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
                {!isCollapsed && <h2 className="text-sm font-semibold text-white">Node Types</h2>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                    title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
            </div>

            {/* Node Type Buttons */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                    {nodeTypes.map(({ type, label, icon: Icon, color }) => (
                        <button
                            key={type}
                            onClick={() => handleAddNode(type, label)}
                            className={`group relative flex w-full items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-left transition-all hover:scale-105 hover:border-slate-600 hover:bg-slate-800 ${isCollapsed ? "justify-center" : ""
                                }`}
                            title={isCollapsed ? label : undefined}
                        >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} shadow-lg`}>
                                <Icon className="h-5 w-5 text-white" />
                            </div>
                            {!isCollapsed && (
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-white">{label}</div>
                                    <div className="text-xs text-slate-400">
                                        {nodes.filter((n) => n.type === type).length} in canvas
                                    </div>
                                </div>
                            )}
                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white shadow-xl group-hover:block">
                                    {label}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            {!isCollapsed && (
                <div className="border-t border-slate-800 p-4">
                    <div className="text-xs text-slate-400">
                        <div className="mb-1 font-medium text-slate-300">Total Nodes</div>
                        <div className="text-2xl font-bold text-white">{nodes.length}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
