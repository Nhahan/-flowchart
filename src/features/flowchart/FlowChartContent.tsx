import { MouseEvent, useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
  useReactFlow,
} from 'react-flow-renderer';
import { CustomNode } from '@/entities/node/ui/CustomNode.tsx';

const initialNodes: Node[] = [{ id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } }];
const initialEdges: Edge[] = [];

export const FlowChartContent = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const { project } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) =>
        nds.map((node) => {
          const change = changes.find((c) => 'id' in c && c.id === node.id);
          return change ? { ...node, ...change } : node;
        }),
      ),
    [],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !changes.some(
              (change) => 'edge' in change && (change.edge as Edge).id === edge.id && change.type === 'remove',
            ),
        ),
      ),
    [],
  );

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const addNode = () => {
    const viewportCenter = project({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    setNodes((nds) => [
      ...nds,
      {
        id: (nds.length + 1).toString(),
        data: { label: `Node ${nds.length + 1}` },
        position: {
          x: viewportCenter.x,
          y: viewportCenter.y,
        },
      },
    ]);
  };

  const onNodeClick = useCallback((_: MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  return (
    <div className='h-screen bg-gray-100 relative'>
      <button
        onClick={addNode}
        className='absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-500 z-50'
      >
        Add Node
      </button>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style: {
            border: selectedNode === node.id ? '2px solid #1976d2' : '1px solid #ccc',
            borderRadius: '12px',
            background: selectedNode === node.id ? '#e3f2fd' : '#ffffff',
            padding: '10px',
            fontWeight: '500',
            boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        panOnScroll
        panOnDrag
        defaultZoom={1.5}
        nodeTypes={{ custom: CustomNode }}
      >
        <Background variant={BackgroundVariant.Lines} gap={16} size={1} color='#ddd' />
        <MiniMap
          nodeColor={(node) => (selectedNode === node.id ? '#1976d2' : '#90caf9')}
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '6px',
            boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
          }}
        />
        <Controls style={{ bottom: 10, right: 10 }} />
      </ReactFlow>
    </div>
  );
};
