import { MongoClient } from "mongodb";

let db = null;

export const connectMongo = async (uri) => {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  console.log("MongoDB connected");
  return db;
};

export const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};

export default { connectMongo, getDb };