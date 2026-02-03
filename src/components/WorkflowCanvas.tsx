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
import { Undo2, Redo2, Trash2, Play, Loader2, Download, Upload as UploadIcon, BookOpen, Zap } from "lucide-react";
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
                style: { stroke: "#8b8cfb", strokeWidth: 1.2 },
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
        <div className="h-full w-full relative">
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
                    style: { stroke: "#8b8cfb", strokeWidth: 1.2 },
                }}
                className="bg-[#0b0f14]"
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={18}
                    size={1}
                    color="#1f2430"
                    className="bg-[#0b0f14]"
                />

                <Controls
                    className="!rounded-md !border !border-white/10 !bg-[#12141a] [&>button]:!border-white/10 [&>button]:!bg-transparent [&>button]:!text-gray-200 [&>button]:!opacity-100 [&>button:hover]:!bg-white/5 [&>button:hover]:!text-white [&>button]:transition-colors"
                />

                <MiniMap
                    position="bottom-right"
                    className="!rounded-md !border !border-white/10 !bg-[#12141a]"
                    nodeColor="#e5e7eb"
                    maskColor="rgba(11, 15, 20, 0.8)"
                />

                {/* Toolbar Panel */}
                <Panel position="top-right" className="flex gap-1 flex-wrap max-w-2xl">
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
                        className="flex items-center gap-1.5 rounded-md border border-violet-400/30 bg-violet-400/10 hover:bg-violet-400/20 disabled:bg-[#1a1f2b] disabled:text-gray-500 disabled:border-white/10 disabled:cursor-not-allowed px-3 py-1.5 text-xs font-medium text-violet-100 transition-colors"
                        title="Run Workflow"
                    >
                        {isExecuting ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Play className="h-3.5 w-3.5" />
                        )}
                        {isExecuting ? "Running..." : "Run"}
                    </button>

                    <button
                        onClick={() => {
                            useWorkflowStore.getState().loadSampleWorkflow();
                        }}
                        className="flex items-center gap-1.5 rounded-md border border-white/10 bg-[#12141a] hover:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors"
                        title="Load Sample Workflow"
                    >
                        <BookOpen className="h-3.5 w-3.5" />
                        Sample
                    </button>

                    <button
                        onClick={() => {
                            const json = exportWorkflow(nodes, edges, "My Workflow");
                            downloadWorkflow(json, "workflow-export");
                        }}
                        className="flex items-center gap-1.5 rounded-md border border-white/10 bg-[#12141a] hover:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors"
                        title="Export Workflow"
                    >
                        <Download className="h-3.5 w-3.5" />
                        Export
                    </button>

                    <button
                        onClick={() => fileImportRef.current?.click()}
                        className="flex items-center gap-1.5 rounded-md border border-white/10 bg-[#12141a] hover:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors"
                        title="Import Workflow"
                    >
                        <UploadIcon className="h-3.5 w-3.5" />
                        Import
                    </button>

                    <input
                        type="file"
                        ref={fileImportRef}
                        onChange={handleImport}
                        accept=".json"
                        className="hidden"
                    />

                    <div className="w-px h-6 bg-white/10 mx-0.5" />
                    
                    <button
                        onClick={undo}
                        disabled={!canUndo()}
                        className="flex items-center gap-1.5 rounded-md border border-white/10 bg-[#12141a] hover:bg-white/5 disabled:bg-[#1a1f2b] disabled:text-gray-500 disabled:cursor-not-allowed px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors"
                        title="Undo"
                    >
                        <Undo2 className="h-3.5 w-3.5" />
                        Undo
                    </button>
                    
                    <button
                        onClick={redo}
                        disabled={!canRedo()}
                        className="flex items-center gap-1.5 rounded-md border border-white/10 bg-[#12141a] hover:bg-white/5 disabled:bg-[#1a1f2b] disabled:text-gray-500 disabled:cursor-not-allowed px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors"
                        title="Redo"
                    >
                        <Redo2 className="h-3.5 w-3.5" />
                        Redo
                    </button>
                    
                    <button
                        onClick={() => {
                            const selectedNodes = nodes.filter((node) => node.selected);
                            selectedNodes.forEach((node) => deleteNode(node.id));
                        }}
                        disabled={!nodes.some((node) => node.selected)}
                        className="flex items-center gap-1.5 rounded-md border border-red-400/30 bg-red-500/10 hover:bg-red-500/20 disabled:bg-[#1a1f2b] disabled:text-gray-500 disabled:border-white/10 disabled:cursor-not-allowed px-3 py-1.5 text-xs font-medium text-red-300 transition-colors"
                        title="Delete Selected"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
}
