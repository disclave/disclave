export const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const retryUntilNullOrUndefined = async <T>(
  get: () => T | undefined,
  maxRetry: number,
  sleepTimeMs: number
): Promise<T | undefined> => {
  let value = get();
  let retryCount = 0;
  while (!value && retryCount < maxRetry) {
    await sleep(sleepTimeMs);
    value = get();
    retryCount++;
  }
  return value;
};
