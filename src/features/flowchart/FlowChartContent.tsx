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
    <div className='h-screen bg-background relative'>
      <button
        onClick={addNode}
        className='absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg hover:bg-primary/90 z-50'
      >
        Add Node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        panOnDrag
        defaultZoom={1.5}
        nodeTypes={{ custom: CustomNode }}
      >
        <Background variant={BackgroundVariant.Lines} gap={16} size={1} color='var(--muted)' />
        <MiniMap
          nodeColor={(node) => (selectedNode === node.id ? 'var(--primary)' : 'var(--muted)')}
          style={{
            backgroundColor: 'var(--background)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
          }}
        />
        <Controls style={{ bottom: 10, right: 10 }} />
      </ReactFlow>
    </div>
  );
};
