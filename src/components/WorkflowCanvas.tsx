"use client";

import { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Connection,
    addEdge,
    BackgroundVariant,
    Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "@/store/workflowStore";
import { Undo2, Redo2, Trash2 } from "lucide-react";

// Import custom nodes
import TextNode from "@/nodes/TextNode";
import UploadImageNode from "@/nodes/UploadImageNode";
import UploadVideoNode from "@/nodes/UploadVideoNode";
import LLMNode from "@/nodes/LLMNode";
import CropImageNode from "@/nodes/CropImageNode";
import ExtractFrameNode from "@/nodes/ExtractFrameNode";

const nodeTypes = {
    text: TextNode,
    "upload-image": UploadImageNode,
    "upload-video": UploadVideoNode,
    llm: LLMNode,
    "crop-image": CropImageNode,
    "extract-frame": ExtractFrameNode,
};

export default function WorkflowCanvas() {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        addEdge: addEdgeToStore,
        deleteNode,
        undo,
        redo,
        canUndo,
        canRedo,
    } = useWorkflowStore();

    const onConnect = useCallback(
        (connection: Connection) => {
            const edge = {
                id: `e${connection.source}-${connection.target}`,
                source: connection.source!,
                target: connection.target!,
                type: "smoothstep",
                animated: true,
                style: { stroke: "#a855f7", strokeWidth: 2 },
            };
            addEdgeToStore(edge);
        },
        [addEdgeToStore]
    );

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Undo: Ctrl+Z or Cmd+Z
            if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
                e.preventDefault();
                undo();
            }
            // Redo: Ctrl+Shift+Z or Cmd+Shift+Z or Ctrl+Y
            if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") || (e.ctrlKey && e.key === "y")) {
                e.preventDefault();
                redo();
            }
            // Delete: Delete or Backspace
            if (e.key === "Delete" || e.key === "Backspace") {
                const selectedNodes = nodes.filter((node) => node.selected);
                selectedNodes.forEach((node) => deleteNode(node.id));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [undo, redo, nodes, deleteNode]);

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                snapToGrid
                snapGrid={[15, 15]}
                defaultEdgeOptions={{
                    type: "smoothstep",
                    animated: true,
                    style: { stroke: "#a855f7", strokeWidth: 2 },
                }}
                className="bg-slate-950"
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    color="#475569"
                    className="bg-slate-950"
                />

                <Controls
                    className="rounded-lg border border-slate-700 bg-slate-800/90 backdrop-blur-sm [&>button]:border-slate-700 [&>button]:bg-slate-800 [&>button]:text-slate-300 [&>button:hover]:bg-slate-700"
                />

                <MiniMap
                    className="rounded-lg border border-slate-700 bg-slate-800/90 backdrop-blur-sm"
                    nodeColor={(node) => {
                        switch (node.type) {
                            case "text":
                                return "#3b82f6";
                            case "upload-image":
                                return "#10b981";
                            case "upload-video":
                                return "#f59e0b";
                            case "llm":
                                return "#a855f7";
                            case "crop-image":
                                return "#ec4899";
                            case "extract-frame":
                                return "#06b6d4";
                            default:
                                return "#64748b";
                        }
                    }}
                    maskColor="rgba(15, 23, 42, 0.8)"
                />

                {/* Toolbar Panel */}
                <Panel position="top-right" className="flex gap-2">
                    <button
                        onClick={undo}
                        disabled={!canUndo()}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo2 className="h-4 w-4" />
                        Undo
                    </button>
                    <button
                        onClick={redo}
                        disabled={!canRedo()}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <Redo2 className="h-4 w-4" />
                        Redo
                    </button>
                    <button
                        onClick={() => {
                            const selectedNodes = nodes.filter((node) => node.selected);
                            selectedNodes.forEach((node) => deleteNode(node.id));
                        }}
                        disabled={!nodes.some((node) => node.selected)}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Selected (Delete)"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
}
