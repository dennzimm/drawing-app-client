import { useSubscription } from '@apollo/client';
import paper from 'paper';
import { hasPath, paths } from 'ramda';
import { useEffect, useRef } from 'react';
import { LAYER_UPDATED } from '../api/drawings/graphql';
import { useStoreState } from '../store/hooks';

export function useSubscribeToUpdates() {
  const subscribedToUpdates = useRef(false);

  const userID = useStoreState((state) => state.user.id);

  const { data } = useSubscription(LAYER_UPDATED, {
    variables: {
      userID,
    },
    shouldResubscribe: subscribedToUpdates.current,
  });

  useEffect(() => {
    subscribedToUpdates.current = true;
  }, []);

  useEffect(() => {
    const [layerID, layerData] = paths(
      [
        ['layerUpdated', 'layerID'],
        ['layerUpdated', 'layerData'],
      ],
      data
    ) as (string | undefined)[];

    if (layerData) {
      if (layerID && hasPath([layerID], paper.project.layers)) {
        paper.project.layers[layerID as any].importJSON(layerData);
      } else {
        paper.project.importJSON(layerData);
      }
    }
  }, [data]);

  return {
    subscribedToUpdates,
  };
}
