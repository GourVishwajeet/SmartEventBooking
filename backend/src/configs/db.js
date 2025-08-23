import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "b1ddb5cn1gtz62xubfco-mysql.services.clever-cloud.com",
  user: process.env.DB_USER || "usc5u1rzh9mahziv",
  password: process.env.DB_PASSWORD || "g4NNs7bXcaHefxoObUxG",
  database: process.env.DB_NAME || "b1ddb5cn1gtz62xubfco",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }, 
});


(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected to MySQL Database");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

export default pool;