"use client";

import { useState } from "react";
import { useWorkflowStore } from "@/store/workflowStore";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";

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

    const runs = useWorkflowStore((state) => state.runs);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "running":
                return <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />;
            case "completed":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case "failed":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "running":
                return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
            case "completed":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "failed":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            default:
                return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    const formatDuration = (ms?: number) => {
        if (!ms) return "—";
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    };

    const formatTime = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div
            className={`relative flex h-full flex-col border-l transition-all duration-200 ${
                isCollapsed ? "w-14" : "w-56"
            } border-white/10 bg-[#12141a]`}
        >
            {/* Header */}
            <div className="flex h-11 items-center justify-between border-b border-white/10 px-3">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {!isCollapsed && (
                    <h2 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                        History
                    </h2>
                )}
            </div>

            {/* Runs List */}
            <div className="flex-1 overflow-y-auto">
                {!isCollapsed && runs.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                        <Clock className="mb-2 h-8 w-8 text-gray-600" />
                        <p className="text-xs text-gray-400">No runs yet</p>
                    </div>
                )}

                {!isCollapsed && runs.length > 0 && (
                    <div className="divide-y divide-white/10">
                        {runs.map((run, index) => {
                            const isExpanded = expandedRun === run.id;
                            return (
                                <div key={run.id} className="border-b border-white/10">
                                    <button
                                        onClick={() => setExpandedRun(isExpanded ? null : run.id)}
                                        className="w-full p-3 text-left text-xs hover:bg-white/5 transition-colors flex items-center gap-2"
                                    >
                                        <div className="flex-shrink-0">
                                            {getStatusIcon(run.status)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-gray-200 font-medium">
                                                Run #{runs.length - index}
                                            </div>
                                            <div className="text-gray-500 text-[10px]">
                                                {formatTime(run.startedAt)} • {formatDuration(run.duration)}
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusColor(run.status)}`}>
                                            {run.status}
                                        </span>
                                        {isExpanded ? (
                                            <ChevronUp className="h-3 w-3 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="h-3 w-3 text-gray-500" />
                                        )}
                                    </button>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="border-t border-white/10 bg-[#0f1319] p-2">
                                            <div className="space-y-1">
                                                {run.nodeRuns.map((nodeRun: NodeRun, idx: number) => (
                                                    <div key={`${run.id}-${idx}`} className="text-[10px] p-2 rounded bg-[#121620] text-gray-300">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-medium text-gray-200">{nodeRun.nodeType}</span>
                                                            <span className={`px-1.5 py-0.5 rounded text-[9px] border ${getStatusColor(nodeRun.status)}`}>
                                                                {nodeRun.status}
                                                            </span>
                                                        </div>
                                                        <div className="text-gray-500 font-mono text-[9px] truncate">
                                                            {nodeRun.nodeId}
                                                        </div>
                                                        <div className="text-gray-500 text-[9px] mt-1">
                                                            {formatDuration(nodeRun.duration)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
