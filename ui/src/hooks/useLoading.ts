import { useState } from "react";

type IsLoading = boolean;
type RunWithLoading = <R, E = any>(
  run: () => Promise<R>
) => Promise<[R | undefined, E | undefined]>;
type Error = any;
type SetLoading = (loading: boolean) => void;

export const useLoading = (
  initialState: boolean = false
): [IsLoading, RunWithLoading, Error, SetLoading] => {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(undefined);

  const runWithLoading: RunWithLoading = async <R, E>(
    run: () => Promise<R>
  ): Promise<[R | undefined, E | undefined]> => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await run();
      return [result, undefined];
    } catch (e) {
      setError(e);
      return [undefined, e];
    } finally {
      setLoading(false);
    }
  };

  return [loading, runWithLoading, error, setLoading];
};
