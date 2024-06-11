import express from 'express';
import { getAllSal, addSal, deleteSal, updateSal, viewSal } from '../controllers/salController.js';

export const salRouter = express.Router();


//Defines the Homepage Route that shows All Students
salRouter.get('/all-sal', getAllSal);

//Defines View Student Route that shows one specific student by their id
salRouter.get('/:id', viewSal);

//Defines New Student Route
salRouter.post('/new-sal', addSal);

//Defines Update Student Route
salRouter.put('/update-sal/:id', updateSal);

//Defines Delete Student Route
salRouter.delete('/delete-sal/:id', deleteSal);