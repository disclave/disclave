import { useEffect } from "react";

export const useInterval = (callback: () => void, ms: number) => {
  useEffect(() => {
    const interval = setInterval(callback, ms);
    return () => clearInterval(interval);
  }, []);
}