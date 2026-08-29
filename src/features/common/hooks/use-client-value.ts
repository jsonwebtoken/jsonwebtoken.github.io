"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Reads a browser-only value without a mount effect, so the server render and the
 * first client render agree and hydration stays clean.
 *
 * `getClientSnapshot` must return a referentially stable value; cache objects at
 * module scope before returning them.
 */
export function useClientValue<T>(
  getClientSnapshot: () => T,
  serverSnapshot: T,
): T {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    () => serverSnapshot,
  );
}
