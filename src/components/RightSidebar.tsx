"use client";

import { useState } from "react";
import { useWorkflowStore } from "@/store/workflowStore";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface NodeRun {
    nodeId: string;
    nodeType: string;
    status: "completed" | "failed" | "running";
    duration: number;
}

interface WorkflowRun {
    id: string;
    status: "running" | "completed" | "failed";
    startedAt: string | Date;
    duration?: number;
    nodeRuns: NodeRun[];
}

export default function RightSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedRun, setExpandedRun] = useState<string | null>(null);

    // Mock data - will be replaced with real data later
    const runs = useWorkflowStore((state) => state.runs);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "running":
                return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
            case "completed":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case "failed":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-slate-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            running: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            completed: "bg-green-500/20 text-green-400 border-green-500/30",
            failed: "bg-red-500/20 text-red-400 border-red-500/30",
            pending: "bg-slate-500/20 text-slate-400 border-slate-500/30",
        };
        return styles[status as keyof typeof styles] || styles.pending;
    };

    const formatDuration = (ms?: number) => {
        if (!ms) return "—";
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    };

    return (
        <div
            className={`relative flex h-full flex-col border-l border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${isCollapsed ? "w-16" : "w-80"
                }`}
        >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                    title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
                {!isCollapsed && <h2 className="text-sm font-semibold text-white">Execution History</h2>}
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto">
                {!isCollapsed && runs.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                        <Clock className="mb-3 h-12 w-12 text-slate-600" />
                        <p className="text-sm font-medium text-slate-400">No executions yet</p>
                        <p className="mt-1 text-xs text-slate-500">Run your workflow to see history</p>
                    </div>
                )}

                {!isCollapsed && runs.length > 0 && (
                    <div className="space-y-2 p-4">
                        {runs.map((run) => (
                            <div
                                key={run.id}
                                className="rounded-lg border border-slate-700 bg-slate-800/50 transition-colors hover:bg-slate-800"
                            >
                                <button
                                    onClick={() => setExpandedRun(expandedRun === run.id ? null : run.id)}
                                    className="flex w-full items-center justify-between p-3 text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(run.status)}
                                        <div>
                                            <div className="text-sm font-medium text-white">
                                                {new Date(run.startedAt).toLocaleTimeString()}
                                            </div>
                                            <div className="text-xs text-slate-400">{formatDuration(run.duration)}</div>
                                        </div>
                                    </div>
                                    <span
                                        className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusBadge(
                                            run.status
                                        )}`}
                                    >
                                        {run.status}
                                    </span>
                                </button>

                                {/* Expanded Node Details */}
                                {expandedRun === run.id && (
                                    <div className="border-t border-slate-700 p-3">
                                        <div className="space-y-2">
                                            {run.nodeRuns.map((nodeRun, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between rounded-lg bg-slate-900/50 p-2"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(nodeRun.status)}
                                                        <span className="text-xs text-slate-300">{nodeRun.nodeType}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-500">
                                                        {formatDuration(nodeRun.duration)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
