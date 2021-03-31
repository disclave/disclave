import {
  Db,
  MongoClient,
  ClientSession,
  WithTransactionCallback,
  OptionalId,
} from "mongodb";
import { retryUntilNullOrUndefined } from "../helpers";

let _client: MongoClient | null = null;
let _db: Db | null = null;

export const initDatabase = async (uri: string, dbName: string) => {
  if (_db && _client) return;

  if (!_client) _client = await MongoClient.connect(uri);

  _db = _client.db(dbName);
};

export const db = async (): Promise<Db> => {
  if (!_db) {
    const retry = retryUntilNullOrUndefined(() => _db, 5, 100);
    if (!retry) throw "Database connection is not initialized!";

    return retry;
  }

  return _db;
};

export const withSession = async <T>(
  run: (session: ClientSession) => T | Promise<T>
): Promise<T> => {
  if (!_client) throw "Database connection is not initialized!";

  // TODO: waiting for https://jira.mongodb.org/browse/NODE-2014
  let result: T;
  await _client.withSession(async (session: ClientSession) => {
    result = await run(session);
  });
  return result;
};

export const withTransaction = async <T>(
  run: WithTransactionCallback<T>
): Promise<T> => {
  return await withSession(
    async (session: ClientSession): Promise<T> => {
      // TODO: waiting for https://jira.mongodb.org/browse/NODE-2014
      let result: T;
      await session.withTransaction(async (session: ClientSession) => {
        result = await run(session);
      });
      return result;
    }
  );
};

export type { Db, ClientSession, WithTransactionCallback, OptionalId };
