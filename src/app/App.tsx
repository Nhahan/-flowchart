import { EdgifyProvider } from 'edgify';
import FlowDiagram from '@/app/FlowDiagram.tsx';

const App = () => {
  return (
    <EdgifyProvider>
      <FlowDiagram />
    </EdgifyProvider>
  );
};

export default App;
