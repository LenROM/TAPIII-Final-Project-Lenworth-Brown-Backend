import express from 'express';

import { addOrder, getAllOrders, viewOrder } from '../controllers/orderController.js';
import { protect } from '../controllers/authController.js';


export const orderRouter = express.Router();


// orderRouter.use(protect)

//Defines the Route that shows All Orders
orderRouter.get('/all-orders/:id', getAllOrders);

//Defines View of Meal Route that shows one specific id
orderRouter.get('/:id', viewOrder);

//Defines New Order Route
orderRouter.post('/new-order', addOrder);