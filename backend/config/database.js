import "dotenv/config";
import pgPromise from "pg-promise";

const pgp = pgPromise();

const config = {
  connectionString: process.env.DATABASE_URL || undefined,
  host: process.env.DB_HOST || undefined,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME || undefined,
  user: process.env.DB_USER || undefined,
  password: process.env.DB_PASSWORD || undefined,
  ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

const db = pgp(config);
let connectionPromise;

export const initDatabase = async () => {
  if (!connectionPromise) {
    connectionPromise = db.one("SELECT 1")
      .then(() => {
        console.log("PostgreSQL connected");
      })
      .catch((error) => {
        connectionPromise = undefined;
        console.error("PostgreSQL connection failed:", error.message);
        throw error;
      });
  }
  return connectionPromise;
};

export const testConnection = async () => {
  const result = await db.one("SELECT NOW() as now");
  console.log("Database time:", result.now);
  return result;
};

export default db;