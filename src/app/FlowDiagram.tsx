import { EdgeData, EdgifyCanvas, NodeData } from 'edgify';

const initialNodes: NodeData[] = [
  {
    id: 'node-1',
    type: 'default',
    position: { x: 100, y: 100 },
    dimensions: { width: 200, height: 100 },
    inputs: [],
    outputs: [
      {
        id: 'output-1',
        nodeId: 'node-1',
        type: 'output',
        position: { x: 200, y: 50 },
      },
    ],
    data: { label: 'Start Node' },
  },
];

const initialEdges: EdgeData[] = [];

export default function FlowDiagram() {
  const handleNodesChange = (nodes: NodeData[]) => {
    console.log('Nodes updated:', nodes);
  };

  const handleEdgesChange = (edges: EdgeData[]) => {
    console.log('Edges updated:', edges);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <EdgifyCanvas
        initialNodes={initialNodes}
        initialEdges={initialEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        width={800} // Optional: Custom canvas width (default: 8000)
        height={600} // Optional: Custom canvas height (default: 6000)
      />
    </div>
  );
}
