import { ClientLoaderFunctionArgs } from "@remix-run/react";

type CachedResourceKey = "user-riders";

export const cachedLoaderLocalStorage = async (
  key: CachedResourceKey,
  args: ClientLoaderFunctionArgs
) => {
  const { serverLoader } = args;
  const cache = localStorage;
  const cachedServerData = cache.getItem(key);
  if (cachedServerData) {
    return JSON.parse(cachedServerData);
  }
  const serverData = await serverLoader();
  cache.setItem(key, JSON.stringify(serverData));
  return serverData;
};

const cache = new Map();

export const cachedLoader = async (
  key: CachedResourceKey,
  args: ClientLoaderFunctionArgs
) => {
  const { serverLoader } = args;
  const cachedServerData = cache.get(key);
  if (cachedServerData) {
    return JSON.parse(cachedServerData);
  }
  const serverData = await serverLoader();
  cache.set(key, JSON.stringify(serverData));
  return serverData;
};

export const invalidateCacheLocalStorage = (key: CachedResourceKey) => {
  const cache = localStorage;
  cache.removeItem(key);
};

export const invalidateCache = (key: CachedResourceKey) => {
  cache.delete(key);
};
