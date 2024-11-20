import { FlowChartContent } from '@/features/flowchart/FlowChartContent.tsx';
import { ReactFlowProvider } from 'react-flow-renderer';

const App = () => {
  return (
    <ReactFlowProvider>
      <FlowChartContent />
    </ReactFlowProvider>
  );
};

export default App;
