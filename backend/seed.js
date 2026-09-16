import { createTables, seedDatabase } from "./config/schema.js";

const runSeed = async () => {
  try {
    await createTables();
    await seedDatabase();
    console.log("Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

runSeed();
