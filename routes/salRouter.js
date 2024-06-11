import express from 'express';
import { getAllSal, addSal, deleteSal, updateSal, viewSal } from '../controllers/salController.js';

export const salRouter = express.Router();



salRouter.get('/all-sal', getAllSal);


salRouter.get('/:id', viewSal);


salRouter.post('/new-sal', addSal);


salRouter.put('/update-sal/:id', updateSal);


salRouter.delete('/delete-sal/:id', deleteSal);