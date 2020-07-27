import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useEffect, useLayoutEffect, useState } from 'react';
import paperProvider from '../providers/paper.provider';
import { GET_TOOL_OPTIONS } from '../store/operations/queries/tool.queries';
import toolProvider, { ToolName } from '../providers/tool.provider';
import {
  EmitOnViewEvent,
  registerViewEvent,
  SegmentAddedEvent,
} from '../helper/event.helper';
import { PUBLISH_NEW_SEGMENT } from '../graphql/segments/segment.publish';
import { NEW_SEGMENT_PUBLISHED } from '../graphql/segments/segment.subscription';
import { createPath } from '../helper/project.helper';

export function usePaper(id: string) {
  const { data: toolOptions } = useQuery(GET_TOOL_OPTIONS);
  const currentToolName: ToolName = toolOptions.tool.toolName;

  const [isReady, setIsReady] = useState(false);

  // TODO: Refactor
  const [userID] = useState(
    new Date().getTime() + (Math.floor(Math.random() * 999) + 1) + ''
  );
  const [publishNewSegment] = useMutation(PUBLISH_NEW_SEGMENT);
  const { data } = useSubscription(NEW_SEGMENT_PUBLISHED, {
    variables: { drawingID: '111', userID },
  });

  function updateFullViewSize() {
    paperProvider.scope.view.viewSize = new paper.Size(
      window.innerWidth,
      window.innerHeight
    );
  }

  useEffect(() => {
    if (data) {
      const {
        newSegmentPublished: { itemID, segmentData, strokeColor, strokeWidth },
      } = data;

      const item = paperProvider.activeLayer.children[itemID] as paper.Path;
      const { x, y } = JSON.parse(segmentData);

      if (!!item) {
        item.addSegments([
          new paper.Segment({
            point: [x, y],
          }),
        ]);
      } else {
        const newPath = createPath({
          options: {
            name: itemID,
            strokeColor,
            strokeWidth,
          },
        });

        paperProvider.activeLayer.addChild(newPath);
      }
    }
  }, [data]);

  useLayoutEffect(() => {
    paperProvider.setup({ id, injectGlobal: true });
    updateFullViewSize();
    setIsReady(true);

    registerViewEvent<SegmentAddedEvent>(
      EmitOnViewEvent.SEGMENT_ADDED,
      (e: any) => {
        const { type, ...rest } = e;

        publishNewSegment({
          variables: {
            newSegmentData: {
              drawingID: '111',
              userID,
              ...rest,
            },
          },
        });
        console.log(e);
      }
    );

    return () => {
      paperProvider.cleanup();
      setIsReady(false);
    };
  }, [id, publishNewSegment, userID]);

  useEffect(() => {
    if (isReady && currentToolName) {
      toolProvider.getTool(currentToolName).activate();
    }

    console.log(userID);
  }, [currentToolName, isReady, userID]);

  return {
    updateFullViewSize,
    isReady,
  };
}
