import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { FC } from 'react';

export const CustomNode: FC<NodeProps> = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        borderRadius: '12px',
        border: '1px solid #ccc',
        background: '#ffffff',
        textAlign: 'center',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
      }}
    >
      {data.label}
      <Handle type='source' position={Position.Right} style={{ background: '#555' }} />
      <Handle type='target' position={Position.Left} style={{ background: '#555' }} />
    </div>
  );
};
