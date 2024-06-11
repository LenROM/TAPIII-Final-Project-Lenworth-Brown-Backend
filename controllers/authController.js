import { pool } from '../database/dbConnections.js';

//Security imports
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const conn = pool;


/**
 * @description - Function to create the JWT token based on some inputs.
 * @param - The user object from database
 */
function signJWTtoken(user) {
    return JWT.sign({
            id: user.id,
            role: user.role,
            firstName: user.fname,
            lastName: user.lname
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

// Inserts data into the users table
export const registerUser = async(req, res, next) => {
    const sqlQuery = `INSERT INTO users (fname, lname, email, password, phone_num, deli_addr, role, last_login)
                      VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;


    const data = req.body;
    const vRole = 'USER';
    const vStatus = 'ACTV';
    const vDate = new Date();

    data.password = await bcrypt.hashSync(data.password);

    const [result] = await conn.query(sqlQuery, [data.fname, data.lname, data.email, data.password,
        data.phone_num, data.deli_addr, vRole, vDate
    ]);


    if (result.insertId > 0) {
        const token = signJWTtoken({
            id: result.insertId,
            role: vRole,
            firstName: data.fname,
            lastName: data.lname,
            phoneNumber: data.phone_num,
            deliveryAddress: data.deli_addr
        });

        res.status(201).json({
            status: 'success',
            data: {
                token,
                user: data,
            }
        });
    } else {
        res.status(400).json({
            status: 'error',
            message: 'Error during registration.'
        })
    }

}


//Selects user from database based on there email
export const loginUser = async(req, res, next) => {
    const data = req.body;

    const [user] = await conn.query(`SELECT * FROM users WHERE email = ?`, [data.email]);

    if (!user.length)
        return res.status(404).json({
            status: 'error',
            message: 'User not found',
        });

    if (user[0].status == 'NACTV')
        return res.status(200).json({
            status: 'error',
            message: 'User not active in system',
        });

    if (!(await bcrypt.compare(data.password, user[0].password)))
        return res.status(200).json({
            status: 'error',
            message: 'Invalid user credentials'
        });

    await conn.query(`UPDATE users SET last_login = CURRENT_TIMESTAMP() WHERE ID = ?`, [user[0].id]);

    const token = signJWTtoken(user[0]);

    user[0].password = undefined;

    res.status(200).json({
        status: 'success',
        data: {
            token,
            user: user[0],
        }
    });
};


//Selects a user from by their id and status, protects specific pages from unauthorized access
export const protect = async(req, res, next) => {
    const authorization = req.get('Authorization');
    console.log(`REQUEST AUTHORIZATION >> ${authorization}`);
    //Optional Chaining Operator

    if (!authorization || !authorization.startsWith('Bearer'))
        return res.status(400).json({
            status: 'error',
            message: 'You must be logged in, in order to access this features.'
        })

    const token = authorization.split(' ')[1];
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(`DECODED TOKEN: ${JSON.stringify(decoded)}`);

        const [user] = await conn.query(`SELECT * FROM users WHERE id = ? AND status = 'ACTV'`, [decoded.id]);
        if (!user.length)
            return next(
                res.status(404).json({
                    status: 'error',
                    message: 'This token is no longer valid or there is a validation error'
                })
            );
        const data = user[0];
        data.password = undefined;
        console.log(`data.password >> ${data.password}`)
            //created a user object on the Request
        req.user = data;
        next();
    } catch (error) {
        console.log(error.message);
        if (error.message == 'jwt expired') {
            return next(
                res.status(400).json({
                    status: 'error',
                    message: 'Token expired'
                })
            );

        } else if (error.message == 'jwt malformed') {
            return next(
                res.status(400).json({
                    status: 'error',
                    message: 'Token malformed'
                })
            );
        } else if (error.message == 'invalid token') {
            return next(
                res.status(400).json({
                    status: 'error',
                    message: 'Token is Invalid!!!'
                })
            );
        } else {
            return next(
                res.status(400).json({
                    status: 'error',
                    message: 'Unknown Error!!!'
                })
            );
        }

    }
    // next();
}

//Retrieves all users data from database
export const getAllUsers = async(req, res, next) => {
    const data = req.body;
    const [users] = await conn.query(`SELECT * FROM users`);
    //TO DO - ERROR CHECK
    const userData = users;

    console.log(`userData >> ${JSON.stringify(userData)}`);
    userData.forEach(user => {
        userData.password = undefined;
    })

    res.status(200).json({
        status: 'success',
        data: {
            users: userData,
        }
    })
}

//Retrieves one user data database
export const getThisUser = async(req, res, next) => {
    const data = req.user;
    if (!data)
        return next();
    // data.password = undefined;
    const [user] = await conn.query(`SELECT * FROM users where id = ?`, [data.id]);
    if (!user.length)
        return res.status(404).json({
            status: 'error',
            message: 'Invalid request'
        });
    user[0].password = undefined;
    res.status(200).json({
        status: 'success',
        data: {
            user: user[0]
        }
    });
}