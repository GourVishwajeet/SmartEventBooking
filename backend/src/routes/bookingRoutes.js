import express from 'express'


import * as bookingController from '../controllers/bookingController.js'

 const BookingRouter = express.Router();
BookingRouter.post('/', bookingController.createBooking);

export default BookingRouter