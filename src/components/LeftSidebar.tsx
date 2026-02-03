"use client";

import { useState } from "react";
import { Type, Image, Video, Sparkles, Crop, Film, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useWorkflowStore } from "@/store/workflowStore";

const nodeTypes = [
    { type: "text", label: "Text", icon: Type },
    { type: "upload-image", label: "Upload Image", icon: Image },
    { type: "upload-video", label: "Upload Video", icon: Video },
    { type: "llm", label: "LLM", icon: Sparkles },
    { type: "crop-image", label: "Crop Image", icon: Crop },
    { type: "extract-frame", label: "Extract Frame", icon: Film },
];

export default function LeftSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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

    const filteredNodeTypes = nodeTypes.filter(node =>
        node.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className={`relative flex h-full flex-col border-r transition-all duration-200 ${
                isCollapsed ? "w-14" : "w-56"
            } border-white/10 bg-[#12141a]`}
        >
            {/* Header */}
            <div className="flex h-11 items-center justify-between border-b border-white/10 px-3">
                {!isCollapsed && (
                    <h2 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                        Nodes
                    </h2>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            </div>

            {/* Search */}
            {!isCollapsed && (
                <div className="border-b border-white/10 px-3 py-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-md border border-white/10 bg-[#0f1319] pl-7 pr-2 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-400/30"
                        />
                    </div>
                </div>
            )}

            {/* Node List */}
            <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                    {filteredNodeTypes.map(({ type, label, icon: Icon }) => (
                        <button
                            key={type}
                            onClick={() => handleAddNode(type, label)}
                            className={`group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-white/5 ${
                                isCollapsed ? "justify-center" : ""
                            }`}
                            title={isCollapsed ? label : undefined}
                        >
                            <Icon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <div className="text-gray-300 font-medium">
                                        {label}
                                    </div>
                                    <div className="text-gray-500 text-[10px]">
                                        {nodes.filter((n) => n.type === type).length} in canvas
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            {!isCollapsed && (
                <div className="border-t border-white/10 px-3 py-2">
                    <div className="text-[10px] text-gray-500">
                        <div className="mb-1">Total nodes</div>
                        <div className="text-lg font-semibold text-gray-200">{nodes.length}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
