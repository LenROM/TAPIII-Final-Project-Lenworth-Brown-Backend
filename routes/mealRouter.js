import express from 'express';

import { getAllMeals, viewMeal } from '../controllers/mealController.js';
import { protect } from '../controllers/authController.js';


export const mealRouter = express.Router();

// mealRouter.use(protect);

//used to protect routes, only shows those who have a token 
mealRouter.use(protect);
//Defines the Route that shows All Meals
mealRouter.get('/all-meals', getAllMeals);

//Defines View of Meal Route that shows one specific id
mealRouter.get('/:id', viewMeal);

// customerRouter.use(protect);
// customerRouter.post('/', createCustomer);
// customerRouter.patch('/:id', updateCustomer);
// customerRouter.delete('/:id', deleteCustomers);