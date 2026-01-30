// Export/Import workflow functionality

import { Node, Edge } from "reactflow";

export interface WorkflowExport {
    name: string;
    description?: string;
    nodes: Node[];
    edges: Edge[];
    version: string;
    createdAt: string;
}

export function exportWorkflow(
    nodes: Node[],
    edges: Edge[],
    name: string,
    description?: string
): string {
    const workflow: WorkflowExport = {
        name,
        description,
        nodes,
        edges,
        version: "1.0.0",
        createdAt: new Date().toISOString(),
    };

    return JSON.stringify(workflow, null, 2);
}

export function importWorkflow(jsonString: string): {
    nodes: Node[];
    edges: Edge[];
} {
    try {
        const workflow: WorkflowExport = JSON.parse(jsonString);
        return {
            nodes: workflow.nodes,
            edges: workflow.edges,
        };
    } catch (error) {
        throw new Error("Invalid workflow JSON");
    }
}

export function downloadWorkflow(jsonString: string, filename: string) {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
