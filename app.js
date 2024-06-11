import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Route to routes folder
import { authRouter } from './routes/authRouter.js';
import { mealRouter } from './routes/mealRouter.js';
import { orderRouter } from './routes/orderRouter.js';

import { attendRouter } from './routes/attendRouter.js';
import { empRouter } from './routes/empRouter.js';

import { salRouter } from './routes/salRouter.js';

const app = express();



app.options('*', cors(['http://localhost:4200']));
app.use(cors(['http://localhost:4200']));


//Body Parsing
app.use(express.json({ limit: '2kb' }));
app.use(express.urlencoded({ extended: true, limit: '2kb' }));

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

//Middleware Section
app.use(morgan('dev'));

//Needed to interpret form field values from post
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1/order", orderRouter);
app.use("/api/v1/menu", mealRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/attend", attendRouter);
app.use("/api/v1/emp", empRouter);
app.use("/api/v1/sal", salRouter);

const port = process.env.PORT;
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}...`));