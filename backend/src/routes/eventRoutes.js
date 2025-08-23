import express from 'express'
import {upload} from '../middleware/upload.js'
import * as eventController from '../controllers/eventController.js'

const eventRouter = express.Router()

eventRouter.get('/', eventController.getAllEvents);
eventRouter.post("/", upload.single("img"), eventController.createEvent);
eventRouter.get('/:id', eventController.getEventById);
eventRouter.put('/:id',upload.single("img"), eventController.updateEvent);
eventRouter.delete('/:id', eventController.deleteEvent);

export default eventRouter