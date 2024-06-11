import mysql from 'mysql2';
import dotenv from 'dotenv';

//Configuration settings from config.env
dotenv.config({ path: './config.env' });

//Connection info from the database
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

}).promise();