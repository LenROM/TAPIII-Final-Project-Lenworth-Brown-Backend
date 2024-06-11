import express from 'express';
import { getAllAttendance, addAttendance, deleteAttendance, updateAttendance, viewAttendance } from '../controllers/attendController.js';
import { protect } from '../controllers/authController.js';
export const attendRouter = express.Router();


//Defines the Route that shows All Attendances
attendRouter.get('/all-attend', getAllAttendance);

//Defines View Attendance Route that shows one specific Attendance by their id
attendRouter.get('/:id', viewAttendance);


//used to protect routes, only shows those who have a token 
attendRouter.use(protect);
//Defines New Attendance Route
attendRouter.post('/new-attend', addAttendance);

//Defines Update Attendance Route
attendRouter.put('/update-attend/:id', updateAttendance);

//Defines Delete Attendance Route
attendRouter.delete('/delete-attend/:id', deleteAttendance);