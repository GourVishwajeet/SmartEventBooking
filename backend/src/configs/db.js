import mysql from 'mysql2/promise'


export const db = await mysql.createConnection({
 host: process.env.MYSQL_HOST || "b1ddb5cn1gtz62xubfco-mysql.services.clever-cloud.com",
  user: process.env.MYSQL_USER || "usc5u1rzh9mahziv",
  password: process.env.MYSQL_PASSWORD || "g4NNs7bXcaHefxoObUxG",
  database: process.env.MYSQL_DB || "b1ddb5cn1gtz62xubfco",
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

