import express from 'express';
import { getAllLeaves, addLeave, deleteLeave, updateLeave, viewLeave } from '../controllers/leaveController.js';

export const leaveRouter = express.Router();


//Defines the Homepage Route that shows All Students
leaveRouter.get('/all-leave', getAllLeaves);

//Defines View Student Route that shows one specific student by their id
leaveRouter.get('/:id', viewLeave);

//Defines New Student Route
leaveRouter.post('/new-leave', addLeave);

//Defines Update Student Route
leaveRouter.put('/update-leave/:id', updateLeave);

//Defines Delete Student Route
leaveRouter.delete('/delete-leave/:id', deleteLeave);