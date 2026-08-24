import { PortfolioProvider } from '../context/PortfolioContext';
import EditorWorkspace from '../components/editor/workspace/EditorWorkspace';

export default function EditorPage() {
  return (
    <PortfolioProvider>
      <EditorWorkspace />
    </PortfolioProvider>
  );
}
