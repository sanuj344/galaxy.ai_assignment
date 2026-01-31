"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Connection,
    addEdge,
    BackgroundVariant,
    Panel,
    Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "@/store/workflowStore";
import { Undo2, Redo2, Trash2, Play, Loader2, Download, Upload as UploadIcon, BookOpen } from "lucide-react";
import { executeWorkflow } from "@/lib/execution";
import { exportWorkflow, downloadWorkflow, importWorkflow } from "@/lib/workflowIO";

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
    const [isExecuting, setIsExecuting] = useState(false);
    const fileImportRef = useRef<HTMLInputElement>(null);

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = event.target?.result as string;
                const { nodes, edges } = importWorkflow(json);
                useWorkflowStore.getState().setWorkflow(nodes, edges);
            } catch (err) {
                alert("Failed to import workflow: " + (err instanceof Error ? err.message : "Invalid file"));
            }
        };
        reader.readAsText(file);
        // Reset input
        e.target.value = "";
    };

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
                const selectedNodes = nodes.filter((node: Node) => node.selected);
                selectedNodes.forEach((node: Node) => deleteNode(node.id));
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
                        onClick={async () => {
                            setIsExecuting(true);
                            try {
                                const results = await executeWorkflow(nodes, edges);
                                const totalDuration = results.reduce((acc, curr) => acc + curr.duration, 0);
                                const run = {
                                    id: `run-${Date.now()}`,
                                    status: results.some(r => r.status === 'failed') ? 'failed' : 'completed',
                                    startedAt: new Date().toISOString(),
                                    duration: totalDuration,
                                    nodeRuns: results.map(r => ({
                                        nodeId: r.nodeId,
                                        nodeType: nodes.find(n => n.id === r.nodeId)?.type || 'unknown',
                                        status: r.status,
                                        duration: r.duration
                                    }))
                                };
                                useWorkflowStore.getState().addRun(run);
                            } catch (error) {
                                console.error("Execution error:", error);
                            } finally {
                                setIsExecuting(false);
                            }
                        }}
                        disabled={isExecuting || nodes.length === 0}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Run Workflow"
                    >
                        {isExecuting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )}
                        {isExecuting ? "Running..." : "Run"}
                    </button>

                    <div className="h-8 w-[1px] bg-slate-700 mx-1" />

                    <button
                        onClick={() => {
                            useWorkflowStore.getState().loadSampleWorkflow();
                        }}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700"
                        title="Load Sample Marketing Kit Workflow"
                    >
                        <BookOpen className="h-4 w-4" />
                        Sample
                    </button>

                    <button
                        onClick={() => {
                            const json = exportWorkflow(nodes, edges, "My Workflow");
                            downloadWorkflow(json, "workflow-export");
                        }}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700"
                        title="Export Workflow as JSON"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </button>

                    <button
                        onClick={() => fileImportRef.current?.click()}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700"
                        title="Import Workflow from JSON"
                    >
                        <UploadIcon className="h-4 w-4" />
                        Import
                    </button>

                    <input
                        type="file"
                        ref={fileImportRef}
                        onChange={handleImport}
                        accept=".json"
                        className="hidden"
                    />

                    <div className="h-8 w-[1px] bg-slate-700 mx-1" />
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
