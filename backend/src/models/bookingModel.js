const db = require('../config/db');

exports.bookTickets = (bookingData, callback) => {
  db.query('INSERT INTO bookings SET ?', bookingData, callback);
};