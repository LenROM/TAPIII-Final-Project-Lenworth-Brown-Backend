import express from 'express';
import { getAllEmployees, addEmployee, deleteEmployee, updateEmployee, viewEmployee } from '../controllers/empController.js';

export const empRouter = express.Router();


//Defines the Homepage Route that shows All Students
empRouter.get('/all-emp', getAllEmployees);

//Defines View Student Route that shows one specific student by their id
empRouter.get('/:id', viewEmployee);

//Defines New Student Route
empRouter.post('/new-emp', addEmployee);

//Defines Update Student Route
empRouter.put('/update-emp/:id', updateEmployee);

//Defines Delete Student Route
empRouter.delete('/delete-emp/:id', deleteEmployee);