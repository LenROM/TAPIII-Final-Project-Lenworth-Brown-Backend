import express from 'express';
import { getAllEmployees, addEmployee, deleteEmployee, updateEmployee, viewEmployee } from '../controllers/empController.js';
import { protect } from '../controllers/authController.js';
export const empRouter = express.Router();


//Defines the Route that shows All Employee
empRouter.get('/all-emp', getAllEmployees);

//Defines View Employee Route that shows one specific Attendance by their id
empRouter.get('/:id', viewEmployee);

//used to protect routes, only shows those who have a token 
empRouter.use(protect);

//Defines New Employee Route
empRouter.post('/new-emp', addEmployee);

//Defines Update Employee Route
empRouter.put('/update-emp/:id', updateEmployee);

//Defines Delete Employee Route
empRouter.delete('/delete-emp/:id', deleteEmployee);