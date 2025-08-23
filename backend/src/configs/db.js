import mysql from 'mysql2/promise'


export const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'event_booking'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

