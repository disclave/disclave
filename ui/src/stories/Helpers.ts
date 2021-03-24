export const sleep = (time: number = 2000, error: any = undefined) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (!error) resolve();
      else reject(error);
    }, time);
  });
};
