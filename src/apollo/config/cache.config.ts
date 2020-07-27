import { InMemoryCache, InMemoryCacheConfig } from '@apollo/client';
import { featuresCacheConfigs } from './features.config';

const cacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {},
    },
  },
};

for (const featuresCacheConfig of featuresCacheConfigs) {
  cacheConfig.typePolicies!['Query'].fields = {
    ...cacheConfig.typePolicies!['Query'].fields,
    ...featuresCacheConfig.queryFields,
  };
}

export const cache: InMemoryCache = new InMemoryCache(cacheConfig);
