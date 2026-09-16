import "dotenv/config";
import pgPromise from "pg-promise";

const pgp = pgPromise();

const config = {
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

const db = pgp(config);

export const initDatabase = async () => {
  try {
    await db.one("SELECT 1");
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    throw error;
  }
};

export const testConnection = async () => {
  const result = await db.one("SELECT NOW() as now");
  console.log("Database time:", result.now);
  return result;
};

export default db;