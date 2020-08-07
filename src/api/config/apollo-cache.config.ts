import { InMemoryCache, InMemoryCacheConfig } from '@apollo/client';

const cacheConfig: InMemoryCacheConfig = {};

export const cache: InMemoryCache = new InMemoryCache(cacheConfig);
