import { TypePolicy } from '@apollo/client/cache';
import { drawingAreaCacheConfig } from '../../features/drawings/store/config/store.config';

export interface FeaturesCacheConfig {
  queryFields: TypePolicy['fields'];
}

export const featuresCacheConfigs: FeaturesCacheConfig[] = [
  drawingAreaCacheConfig,
];
