import { useState } from "react";

type IsLoading = boolean;
type SetLoading = (loading: boolean) => void;
type RunWithLoading = <R, E = any>(
  run: () => Promise<R>
) => Promise<[R | undefined, E | undefined]>;

export const useLoading = (
  initialState: boolean = false
): [IsLoading, SetLoading, RunWithLoading] => {
  const [loading, setLoading] = useState(initialState);

  const runWithLoading: RunWithLoading = async (run) => {
    setLoading(true);
    try {
      const result = await run();
      return [result, undefined];
    } catch (e) {
      return [undefined, e];
    } finally {
      setLoading(false);
    }
  };

  return [loading, setLoading, runWithLoading];
};
