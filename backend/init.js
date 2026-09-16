import db from "./config/database.js";
import { createTables, seedDatabase } from "./config/schema.js";

const init = async () => {
  try {
    await createTables();
    await seedDatabase();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Initialization failed:", error);
  }
};

init();