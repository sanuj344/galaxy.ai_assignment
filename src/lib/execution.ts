import { Node, Edge } from "reactflow";

export interface ExecutionResult {
    nodeId: string;
    status: "completed" | "failed";
    output?: any;
    error?: string;
    duration: number;
}

// Topological sort for DAG execution order
export function topologicalSort(nodes: Node[], edges: Edge[]): string[][] {
    const adjacencyList = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    // Initialize
    nodes.forEach((node) => {
        adjacencyList.set(node.id, []);
        inDegree.set(node.id, 0);
    });

    // Build graph
    edges.forEach((edge) => {
        adjacencyList.get(edge.source)?.push(edge.target);
        inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    });

    // Find nodes with no dependencies (in-degree = 0)
    const layers: string[][] = [];
    let currentLayer = nodes.filter((node) => inDegree.get(node.id) === 0).map((n) => n.id);

    while (currentLayer.length > 0) {
        layers.push([...currentLayer]);
        const nextLayer: string[] = [];

        currentLayer.forEach((nodeId) => {
            const neighbors = adjacencyList.get(nodeId) || [];
            neighbors.forEach((neighbor) => {
                const newDegree = (inDegree.get(neighbor) || 0) - 1;
                inDegree.set(neighbor, newDegree);
                if (newDegree === 0) {
                    nextLayer.push(neighbor);
                }
            });
        });

        currentLayer = nextLayer;
    }

    return layers;
}

// Execute a single node
async function executeNode(
    node: Node,
    inputs: Map<string, any>
): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
        let output: any;

        switch (node.type) {
            case "text":
                output = { text: node.data.text || "" };
                break;

            case "upload-image":
                output = { imageUrl: node.data.imageUrl, fileName: node.data.fileName };
                break;

            case "upload-video":
                output = { videoUrl: node.data.videoUrl, fileName: node.data.fileName };
                break;

            case "llm":
                // Simulate LLM execution
                await new Promise((resolve) => setTimeout(resolve, 1500));
                const textInput = inputs.get("text");
                const imageInput = inputs.get("image");
                output = {
                    text: `LLM Response: Processed "${textInput?.text || node.data.userMessage}" ${imageInput ? "with image" : ""
                        }`,
                };
                break;

            case "crop-image":
                // Simulate crop execution
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const imageForCrop = inputs.get("image");
                output = {
                    imageUrl: imageForCrop?.imageUrl,
                    cropped: true,
                    dimensions: {
                        x: node.data.x || 0,
                        y: node.data.y || 0,
                        width: node.data.width || 100,
                        height: node.data.height || 100,
                    },
                };
                break;

            case "extract-frame":
                // Simulate frame extraction
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const videoInput = inputs.get("video");
                output = {
                    imageUrl: videoInput?.videoUrl,
                    timestamp: node.data.timestamp || 0,
                    format: node.data.format || "jpg",
                };
                break;

            default:
                output = {};
        }

        return {
            nodeId: node.id,
            status: "completed",
            output,
            duration: Date.now() - startTime,
        };
    } catch (error) {
        return {
            nodeId: node.id,
            status: "failed",
            error: error instanceof Error ? error.message : "Unknown error",
            duration: Date.now() - startTime,
        };
    }
}

// Execute workflow with parallel execution per layer
export async function executeWorkflow(
    nodes: Node[],
    edges: Edge[],
    selectedNodeIds?: string[]
): Promise<ExecutionResult[]> {
    const layers = topologicalSort(nodes, edges);
    const results: ExecutionResult[] = [];
    const outputs = new Map<string, any>();

    // Filter nodes if selective execution
    const nodesToExecute = selectedNodeIds
        ? new Set(selectedNodeIds)
        : new Set(nodes.map((n) => n.id));

    for (const layer of layers) {
        // Execute all nodes in this layer in parallel
        const layerPromises = layer
            .filter((nodeId) => nodesToExecute.has(nodeId))
            .map(async (nodeId) => {
                const node = nodes.find((n) => n.id === nodeId)!;

                // Gather inputs from connected nodes
                const incomingEdges = edges.filter((e) => e.target === nodeId);
                const inputs = new Map<string, any>();

                incomingEdges.forEach((edge) => {
                    const sourceOutput = outputs.get(edge.source);
                    if (sourceOutput) {
                        inputs.set(edge.targetHandle || "default", sourceOutput);
                    }
                });

                const result = await executeNode(node, inputs);
                if (result.status === "completed") {
                    outputs.set(nodeId, result.output);
                }
                return result;
            });

        const layerResults = await Promise.all(layerPromises);
        results.push(...layerResults);
    }

    return results;
}
