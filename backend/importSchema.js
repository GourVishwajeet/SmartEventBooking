import fs from "fs";
import {db} from "./src/configs/db.js";

async function importSchema() {
  const schema = fs.readFileSync("eventBooking.sql", "utf-8");
  try {
    await db.query(schema);
    console.log("Schema imported successfully");
    process.exit();
  } catch (err) {
    console.error("Failed to import schema", err);
    process.exit(1);
  }
}

importSchema();
