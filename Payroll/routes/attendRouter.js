import express from 'express';
import { getAllAttendance, addAttendance, deleteAttendance, updateAttendance, viewAttendance } from '../controllers/attendController.js';

export const attendRouter = express.Router();


//Defines the Homepage Route that shows All Students
attendRouter.get('/all-attend', getAllAttendance);

//Defines View Student Route that shows one specific student by their id
attendRouter.get('/:id', viewAttendance);

//Defines New Student Route
attendRouter.post('/new-attend', addAttendance);

//Defines Update Student Route
attendRouter.put('/update-attend/:id', updateAttendance);

//Defines Delete Student Route
attendRouter.delete('/delete-attend/:id', deleteAttendance);