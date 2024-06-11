import { pool } from '../database/dbConnections.js';


//Retrieves all Student data from database
export const getAllEmployees = async(req, res, next) => {
    const { id } = req.params;

    let sqlQuery = `SELECT * FROM employee`;

    const [employee, fields] = await pool.query(sqlQuery, [id]);

    //Request has succeeded
    res.status(200).json({

        status: 'success',
        results: employee.length,
        data: employee
    });
}

//Retrieves one single Student from database
export const viewEmployee = async(req, res, next) => {

    const { id } = req.params


    const [employee, fields] = await pool.query("SELECT * FROM employee WHERE empId = ?", [id])
        //Error handling to check for existance of a record
    if (employee.length <= 0) {
        res.status(404).json({

            status: 'error',
            message: 'Record not found',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({

            status: 'success',
            results: employee.length,
            data: { employee }
        });
    }

}

export const addEmployee = async(req, res, next) => {
    const { empName, empContactNo, empEmail, address, bankName, accountNo, bankBranch, salary } = req.body

    const sqlQuery = `INSERT INTO employee (empName, empContactNo, empEmail, address, bankName, accountNo, bankBranch, salary)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    const [employee, fields] = await pool.query(sqlQuery, [empName, empContactNo, empEmail, address, bankName, accountNo, bankBranch, salary])

    //Request has succeeded and one or multiple resource being created
    res.status(201).json({

        status: 'success',
        insertId: employee.insertId,
    });
}


//Updates data in the Student table of the database
export const updateEmployee = async(req, res, next) => {

    const { empName, empContactNo, empEmail, address, bankName, accountNo, bankBranch, salary } = req.body

    const { id } = req.params

    const sqlQuery = `UPDATE employee SET empName = ?, empContactNo = ?, empEmail = ?, address = ?, bankName = ?, accountNo = ?, bankBranch = ?, salary = ?
                    WHERE empId = ?`

    const [employee, fields] = await pool.query(sqlQuery, [empName, empContactNo, empEmail, address, bankName, accountNo, bankBranch, salary, id]);

    //Error handling to check for existance of a record
    if (employee.affectedRows == 0) {
        res.status(404).json({
            status: 'error',
            messages: 'Unable to update',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({
            status: 'Record successfully updated',
            insertId: employee.affectedRows,

        });
    }

}


//Delete row from Student table of the database
export const deleteEmployee = async(req, res, next) => {

    const { id } = req.params

    const [employee, fields] = await pool.query("DELETE from employee WHERE empId = ?", [id])

    //Error handling to check for existance of a record
    if (employee.affectedRows == 0) {
        res.status(404).json({
            status: 'error',
            messages: 'Unable to delete',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({
            status: 'Record successfully created',
            insertId: employee.affectedRows,

        });
    }

}