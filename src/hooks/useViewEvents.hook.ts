import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { PUBLISH_NEW_SEGMENT } from '../graphql/mutations/segment.mutations';
import { SegmentAddedEvent, SegmentEvents } from '../helper/segment.helper';
import paperProvider from '../providers/paper.provider';

interface UseViewEventsProps {
  userID: string;
  drawingID: string;
  isReady: boolean;
}

export function useViewEvents(props: UseViewEventsProps) {
  const { drawingID, userID, isReady } = props;

  const [publishNewSegment] = useMutation(PUBLISH_NEW_SEGMENT);

  useEffect(() => {
    if (isReady) {
      paperProvider.view.on(
        SegmentEvents.SEGMENT_ADDED,
        (event: SegmentAddedEvent) => {
          publishNewSegment({
            variables: {
              newSegmentData: {
                drawingID,
                userID,
                ...event,
              },
            },
          });
        }
      );
    }
  }, [drawingID, isReady, publishNewSegment, userID]);
}
