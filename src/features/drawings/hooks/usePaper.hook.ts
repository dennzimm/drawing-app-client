import { useQuery } from '@apollo/client';
import { useEffect, useLayoutEffect, useState } from 'react';
import paperProvider from '../providers/paper.provider';
import toolProvider, { ToolName } from '../providers/tool.provider';
import { GET_TOOL_OPTIONS } from '../store/operations/queries/tool.queries';

export function usePaper(id: string) {
  const { data: toolOptions } = useQuery(GET_TOOL_OPTIONS);
  const currentToolName: ToolName = toolOptions.tool.toolName;

  const [isReady, setIsReady] = useState(false);

  function updateFullViewSize() {
    paperProvider.scope.view.viewSize = new paper.Size(
      window.innerWidth,
      window.innerHeight
    );
  }

  useLayoutEffect(() => {
    paperProvider.setup({ id, injectGlobal: true });
    updateFullViewSize();
    setIsReady(true);

    return () => {
      paperProvider.cleanup();
      setIsReady(false);
    };
  }, [id]);

  useEffect(() => {
    if (isReady && currentToolName) {
      toolProvider.getTool(currentToolName).activate();
    }
  }, [currentToolName, isReady]);

  return {
    updateFullViewSize,
    isReady,
  };
}
