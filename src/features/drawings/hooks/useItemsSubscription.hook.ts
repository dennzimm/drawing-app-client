import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import {
  ItemDataPublished,
  ItemDataPublishedVariables,
} from '../../../apollo/__generated__/types';
import { ITEM_DATA_PUBLISHED } from '../graphql/subscriptions/item.subscriptions';
import { handleSegmentAdded } from '../helper/segment.helper';

interface UseItemsSubscription {
  userID: string;
  drawingID: string;
  isReady: boolean;
}

export function useItemsSubscription(props: UseItemsSubscription) {
  const { drawingID, userID, isReady } = props;

  const { loading, data } = useSubscription<
    ItemDataPublished,
    ItemDataPublishedVariables
  >(ITEM_DATA_PUBLISHED, {
    variables: { drawingID, userID },
  });

  useEffect(() => {
    if (isReady) {
      if (!loading && data) {
        const { itemDataPublished } = data;

        switch (itemDataPublished.__typename) {
          case 'Segment': {
            handleSegmentAdded({
              itemID: itemDataPublished.itemID,
              strokeColor: itemDataPublished.strokeColor,
              fillColor: itemDataPublished.fillColor,
              strokeWidth: itemDataPublished.strokeWidth,
              segmentData: itemDataPublished.segmentData,
            });
            break;
          }

          default: {
            break;
          }
        }
      }
    }
  }, [data, isReady, loading]);
}
