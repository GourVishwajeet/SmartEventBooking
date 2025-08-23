import db from '../configs/db.js'

export const getAllEvents = (filters, callback) => {
  let query = 'SELECT * FROM events';
  if (filters) {
    // Add filtering logic here
  }
  db.query(query, callback);
};

export const createEvent = (eventData, callback) => {
  db.query('INSERT INTO events SET ?', eventData, callback);
};