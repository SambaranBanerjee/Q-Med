import express from 'express';
import { addDoctors, getDoctors } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.get('/doctors', getDoctors)
doctorRouter.post('/doctors', addDoctors);

export default doctorRouter;