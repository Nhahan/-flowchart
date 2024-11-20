import { FC } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

export const CustomNode: FC<NodeProps> = ({ data }) => {
  return (
    <div className='p-4 rounded-lg border bg-card text-card-foreground shadow-md !important'>
      {data.label}
      {/* 핸들 설정 */}
      <Handle type='source' position={Position.Right} id='source' style={{ background: 'var(--ring)' }} />
      <Handle type='target' position={Position.Left} id='target' style={{ background: 'var(--ring)' }} />
    </div>
  );
};
