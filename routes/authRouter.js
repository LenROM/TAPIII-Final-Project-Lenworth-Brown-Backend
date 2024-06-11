import express from 'express';
import { getAllUsers, loginUser, protect, registerUser, getThisUser } from '../controllers/authController.js';

export const authRouter = express.Router();

// The route used to access data from the Register table
authRouter.post('/register', registerUser);

//The route that logs in a user to a website
authRouter.post('/login', loginUser);


//used to protect routes, only shows those who have a token 
authRouter.use(protect);

//Route used to get all users
authRouter.get('/all-users', getAllUsers);

//Route used to get a single user
authRouter.get('/my-profile', getThisUser);