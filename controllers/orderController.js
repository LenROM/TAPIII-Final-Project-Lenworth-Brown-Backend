import { pool } from '../database/dbConnections.js';


//Retrieves all Orders data from database
export const getAllOrders = async(req, res, next) => {
    const { id } = req.params;

    let sqlQuery = `SELECT users.id, users.fname, users.lname, users.deli_addr, meals.meal_nm, meals.description, meals.price, meals.img, orders.order_tot, orders.delivery_status, orders.order_date
    FROM orders
    INNER JOIN users ON orders.user_id = users.id
    INNER JOIN meals ON orders.meals_id = meals.id
    WHERE users.id = ?`;

    const [orders, fields] = await pool.query(sqlQuery, [id]);

    //Request has succeeded
    res.status(200).json({

        status: 'success',
        results: orders.length,
        orders: orders
    });
}

//Retrieves one single Order from database
export const viewOrder = async(req, res, next) => {

    const { id } = req.params


    const [orders, fields] = await pool.query("SELECT * FROM orders WHERE id = ?", [id])
        //Error handling to check for existance of a record
    if (orders.length <= 0) {
        res.status(404).json({

            status: 'error',
            message: 'Record not found',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({

            status: 'success',
            results: orders.length,
            data: { orders }
        });
    }

}


//Inserts an Order into the database
export const addOrder = async(req, res, next) => {
    const { order_tot, delivery_status, order_date, quantity, user_id, meals_id } = req.body

    const sqlQuery = `INSERT INTO orders (order_tot, delivery_status, order_date, quantity, user_id, meals_id)
                    VALUES (?, ?, ?, ?, ?, ?)`

    const [orders, fields] = await pool.query(sqlQuery, [order_tot, delivery_status, order_date, quantity, user_id, meals_id])

    //Request has succeeded and one or multiple resource being created
    res.status(201).json({

        status: 'success',
        insertId: orders.insertId,
    });
}