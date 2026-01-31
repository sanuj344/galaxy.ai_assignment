import { create } from "zustand";
import { Node, Edge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from "reactflow";

interface WorkflowState {
    nodes: Node[];
    edges: Edge[];
    runs: any[]; // Persisted execution history
    history: { nodes: Node[]; edges: Edge[] }[];
    historyIndex: number;

    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    setWorkflow: (nodes: Node[], edges: Edge[]) => void;
    addRun: (run: any) => void;
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
    loadSampleWorkflow: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
    nodes: [],
    edges: [],
    runs: [],
    history: [{ nodes: [], edges: [] }],
    historyIndex: 0,

    setNodes: (nodes) => set({ nodes }),

    setEdges: (edges) => set({ edges }),

    setWorkflow: (nodes, edges) => {
        set({ nodes, edges, history: [{ nodes, edges }], historyIndex: 0 });
    },

    addRun: (run) => set({ runs: [run, ...get().runs] }),

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

    loadSampleWorkflow: () => {
        const sampleNodes: Node[] = [
            { id: '1', type: 'upload-image', position: { x: 50, y: 50 }, data: { label: 'Upload Product Photo' } },
            { id: '2', type: 'crop-image', position: { x: 400, y: 50 }, data: { label: 'Crop for Instagram', x: 0, y: 0, width: 1080, height: 1080 } },
            { id: '3', type: 'llm', position: { x: 750, y: 150 }, data: { label: 'Generate Caption', systemPrompt: 'Write a catchy Instagram caption.', userMessage: 'Write a caption for this product photo.' } },
            { id: '4', type: 'upload-video', position: { x: 50, y: 350 }, data: { label: 'Upload Product Demo' } },
            { id: '5', type: 'extract-frame', position: { x: 400, y: 350 }, data: { label: 'Extract Key Frame', timestamp: 2.5, format: 'jpg' } },
        ];
        const sampleEdges: Edge[] = [
            { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: { stroke: "#a855f7", strokeWidth: 2 } },
            { id: 'e2-3', source: '2', target: '3', targetHandle: 'image', type: 'smoothstep', animated: true, style: { stroke: "#a855f7", strokeWidth: 2 } },
            { id: 'e5-3', source: '5', target: '3', targetHandle: 'text', type: 'smoothstep', animated: true, style: { stroke: "#a855f7", strokeWidth: 2 } },
            { id: 'e4-5', source: '4', target: '5', type: 'smoothstep', animated: true, style: { stroke: "#a855f7", strokeWidth: 2 } },
        ];
        get().setWorkflow(sampleNodes, sampleEdges);
    }
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
