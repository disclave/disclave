import { Db, MongoClient } from "mongodb";

const uri = process.env.DB_CONNECTION_URI;
const dbName = process.env.DB_NAMEl

const client = new MongoClient(uri);

export const run = async <T>(r: (db: Db) => Promise<T> | T): Promise<T> => {
  try {
    await client.connect();
    return await r(client.db(dbName));
  } finally {
    await client.close();
  }
}

export type {Db};

