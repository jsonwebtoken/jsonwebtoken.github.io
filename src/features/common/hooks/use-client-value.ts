"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// `getClientSnapshot` must return a referentially stable value; cache objects at
// module scope before returning them.
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
