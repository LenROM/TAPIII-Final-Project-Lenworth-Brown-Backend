import { pool } from '../database/dbConnections.js';


//Retrieves all Meals data from database
export const getAllMeals = async(req, res, next) => {
    let sqlQuery = `SELECT * FROM meals`;

    const [meals, fields] = await pool.query(sqlQuery);

    //Request has succeeded
    res.status(200).json({

        status: 'success',
        results: meals.length,
        meals: meals
    });
}

//Retrieves one single Meal from database
export const viewMeal = async(req, res, next) => {

    const { id } = req.params


    const [meals, fields] = await pool.query("SELECT * FROM meals WHERE id = ?", [id])
        //Error handling to check for existance of a record
    if (meals.length <= 0) {
        res.status(404).json({

            status: 'error',
            message: 'Record not found',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({

            status: 'success',
            results: meals.length,
            data: { meals }
        });
    }

}











// //Creates new Meal in the database
// export const createCustomer = async(req, res, next) => {

//     const { first_name, last_name, phone_number } = req.body

//     const sqlQuery = `INSERT INTO student (first_name, last_name, phone_number)
//                     VALUES (?, ?, ?)`

//     const [students, fields] = await pool.query(sqlQuery, [first_name, last_name, phone_number])

//     //Request has succeeded and one or multiple resource being created
//     res.status(201).json({

//         status: 'success',
//         insertId: students.insertId,
//     });
// }


// //Updates data in the Student table of the database
// export const updateStudent = async(req, res, next) => {

//     const { first_name, last_name, phone_number } = req.body

//     const { id } = req.params

//     const sqlQuery = `UPDATE student SET first_name = ?, last_name = ?, phone_number = ?
//                     WHERE id = ?`

//     const [students, fields] = await pool.query(sqlQuery, [first_name, last_name, phone_number, id]);

//     //Error handling to check for existance of a record
//     if (students.affectedRows == 0) {
//         res.status(404).json({
//             status: 'error',
//             messages: 'Unable to update',
//         });
//     } else {
//         //Else the request has succeeded
//         res.status(200).json({
//             status: 'Record successfully updated',
//             insertId: students.affectedRows,

//         });
//     }

// }


// //Delete row from Student table of the database
// export const deleteStudent = async(req, res, next) => {

//     const { id } = req.params

//     const [students, fields] = await pool.query("DELETE from student WHERE id = ?", [id])

//     //Error handling to check for existance of a record
//     if (students.affectedRows == 0) {
//         res.status(404).json({
//             status: 'error',
//             messages: 'Unable to delete',
//         });
//     } else {
//         //Else the request has succeeded
//         res.status(200).json({
//             status: 'Record successfully created',
//             insertId: students.affectedRows,

//         });
//     }

// }