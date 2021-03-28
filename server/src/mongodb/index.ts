import { Db, MongoClient } from "mongodb";

let _client: MongoClient | null = null;
let _db: Db | null = null;

export const initDatabase = async (uri: string, dbName: string) => {
  if (!_client)
    _client = new MongoClient(uri);

  if (!_client.isConnected)
    await _client.connect();

  if (!_db)
    _db = _client.db(dbName);
}

export const db = (): Db => {
  if (!_db)
    throw "Database connection is not initialized!";

  return _db;
}

export type {Db};

