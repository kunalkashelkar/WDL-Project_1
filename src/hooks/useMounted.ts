import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook to safely detect client-side mounting without triggering React 19 setState-in-effect linter errors.
 * Returns `false` on the server and during initial hydration, then returns `true` on the client.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
