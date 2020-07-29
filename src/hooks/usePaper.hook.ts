// import { useQuery } from '@apollo/client';
import { useEffect, useLayoutEffect, useState } from 'react';
import paperProvider from '../providers/paper.provider';
import toolProvider from '../providers/tool.provider';
// import { GET_TOOL_OPTIONS } from '../store/operations/queries/tool.queries';

export function usePaper(id: string) {
  // const { data: toolOptions } = useQuery(GET_TOOL_OPTIONS);
  // const currentToolName: ToolName = toolOptions.tool.toolName;

  const [isReady, setIsReady] = useState(false);

  function updateFullViewSize() {
    paperProvider.scope.view.viewSize = new paperProvider.scope.Size(
      window.innerWidth,
      window.innerHeight
    );
  }

  useEffect(() => {
    paperProvider.setup({ id, injectGlobal: true });
    updateFullViewSize();
    toolProvider.getTool('pencil').activate();
    setIsReady(true);

    return () => {
      paperProvider.cleanup();
      setIsReady(false);
    };
  }, [id]);

  return {
    updateFullViewSize,
    isReady,
  };
}
