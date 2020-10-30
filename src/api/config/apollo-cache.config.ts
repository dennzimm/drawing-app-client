import { InMemoryCache, InMemoryCacheConfig } from "@apollo/client";

/**
 * Configuring the cache
 *
 * Apollo Client stores the results of its GraphQL queries in a normalized, in-memory cache.
 * This enables your client to respond to future queries for the same data without sending unnecessary network requests.
 *
 * As of Apollo Client 3.0, the InMemoryCache class is provided by the @apollo/client package.
 * No additional libraries are required.
 *
 * (https://www.apollographql.com/docs/react/caching/cache-configuration/)
 */
const cacheConfig: InMemoryCacheConfig = {};

export const cache: InMemoryCache = new InMemoryCache(cacheConfig);
