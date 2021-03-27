import { Db, MongoClient } from "mongodb";

const uri = process.env.DB_CONNECTION_URI;
const dbName = process.env.DB_NAMEl

const client = new MongoClient(uri);

export const db = async (): Promise<Db> => {
  if (!client.isConnected) {
    await client.connect();
  }

  return client.db(dbName);
}

