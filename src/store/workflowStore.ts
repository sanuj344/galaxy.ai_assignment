import { create } from "zustand";
import { Node, Edge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from "reactflow";

interface WorkflowState {
    nodes: Node[];
    edges: Edge[];
    history: { nodes: Node[]; edges: Edge[] }[];
    historyIndex: number;

    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    addNode: (node: Node) => void;
    addEdge: (edge: Edge) => void;
    deleteNode: (nodeId: string) => void;
    deleteEdge: (edgeId: string) => void;
    undo: () => void;
    redo: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;
    saveToHistory: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
    nodes: [],
    edges: [],
    history: [{ nodes: [], edges: [] }],
    historyIndex: 0,

    setNodes: (nodes) => set({ nodes }),

    setEdges: (edges) => set({ edges }),

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    addNode: (node) => {
        set({ nodes: [...get().nodes, node] });
        get().saveToHistory();
    },

    addEdge: (edge) => {
        // Check for cycles before adding edge
        const { nodes, edges } = get();
        const newEdges = [...edges, edge];

        if (hasCycle(nodes, newEdges)) {
            console.warn("Cannot add edge: would create a cycle");
            return;
        }

        set({ edges: newEdges });
        get().saveToHistory();
    },

    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter((n) => n.id !== nodeId),
            edges: get().edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        });
        get().saveToHistory();
    },

    deleteEdge: (edgeId) => {
        set({ edges: get().edges.filter((e) => e.id !== edgeId) });
        get().saveToHistory();
    },

    saveToHistory: () => {
        const { nodes, edges, history, historyIndex } = get();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ nodes: [...nodes], edges: [...edges] });

        // Limit history to 50 states
        if (newHistory.length > 50) {
            newHistory.shift();
        }

        set({
            history: newHistory,
            historyIndex: newHistory.length - 1,
        });
    },

    undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            const state = history[newIndex];
            set({
                nodes: state.nodes,
                edges: state.edges,
                historyIndex: newIndex,
            });
        }
    },

    redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            const state = history[newIndex];
            set({
                nodes: state.nodes,
                edges: state.edges,
                historyIndex: newIndex,
            });
        }
    },

    canUndo: () => get().historyIndex > 0,

    canRedo: () => get().historyIndex < get().history.length - 1,
}));

// DAG cycle detection using DFS
function hasCycle(nodes: Node[], edges: Edge[]): boolean {
    const adjacencyList = new Map<string, string[]>();

    // Build adjacency list
    nodes.forEach((node) => adjacencyList.set(node.id, []));
    edges.forEach((edge) => {
        const neighbors = adjacencyList.get(edge.source) || [];
        neighbors.push(edge.target);
        adjacencyList.set(edge.source, neighbors);
    });

    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    function dfs(nodeId: string): boolean {
        visited.add(nodeId);
        recursionStack.add(nodeId);

        const neighbors = adjacencyList.get(nodeId) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) return true;
            } else if (recursionStack.has(neighbor)) {
                return true; // Cycle detected
            }
        }

        recursionStack.delete(nodeId);
        return false;
    }

    for (const node of nodes) {
        if (!visited.has(node.id)) {
            if (dfs(node.id)) return true;
        }
    }

    return false;
}
