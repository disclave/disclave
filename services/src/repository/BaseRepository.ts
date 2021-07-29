export abstract class BaseRepository<T> {
  abstract runTransaction(run: (t: T) => Promise<unknown>): Promise<void>;
}
