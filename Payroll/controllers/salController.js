import { pool } from '../database/dbConnections.js';


//Retrieves all Student data from database
export const getAllSal = async(req, res, next) => {
    const { id } = req.params;

    let sqlQuery = `SELECT * FROM salary`;

    const [salary, fields] = await pool.query(sqlQuery, [id]);

    //Request has succeeded
    res.status(200).json({

        status: 'success',
        results: salary.length,
        salary: salary
    });
}

//Retrieves one single Student from database
export const viewSal = async(req, res, next) => {

    const { id } = req.params


    const [salary, fields] = await pool.query("SELECT * FROM salary WHERE SalaryId = ?", [id])
        //Error handling to check for existance of a record
    if (salary.length <= 0) {
        res.status(404).json({

            status: 'error',
            message: 'Record not found',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({

            status: 'success',
            results: salary.length,
            data: { salary }
        });
    }

}

export const addSal = async(req, res, next) => {
    const { EmployeeId, SalaryDate, PresentDays, SalaryAmount } = req.body

    const sqlQuery = `INSERT INTO salary (EmployeeId, SalaryDate, PresentDays, SalaryAmount)
                    VALUES (?, ?, ?, ?)`

    const [salary, fields] = await pool.query(sqlQuery, [EmployeeId, SalaryDate, PresentDays, SalaryAmount])

    //Request has succeeded and one or multiple resource being created
    res.status(201).json({

        status: 'success',
        insertId: salary.insertId,
    });
}


//Updates data in the Student table of the database
export const updateSal = async(req, res, next) => {

    const { EmployeeId, SalaryDate, PresentDays, SalaryAmount } = req.body

    const { id } = req.params

    const sqlQuery = `UPDATE salary SET EmployeeId = ?, SalaryDate = ?, PresentDays = ?, SalaryAmount = ?
                    WHERE SalaryId = ?`

    const [salary, fields] = await pool.query(sqlQuery, [EmployeeId, SalaryDate, PresentDays, SalaryAmount, id]);

    //Error handling to check for existance of a record
    if (salary.affectedRows == 0) {
        res.status(404).json({
            status: 'error',
            messages: 'Unable to update',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({
            status: 'Record successfully updated',
            insertId: salary.affectedRows,

        });
    }

}


//Delete row from Student table of the database
export const deleteSal = async(req, res, next) => {

    const { id } = req.params

    const [students, fields] = await pool.query("DELETE from student WHERE SalaryId = ?", [id])

    //Error handling to check for existance of a record
    if (students.affectedRows == 0) {
        res.status(404).json({
            status: 'error',
            messages: 'Unable to delete',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({
            status: 'Record successfully created',
            insertId: students.affectedRows,

        });
    }

}