import { pool } from '../database/dbConnections.js';


//Retrieves all Student data from database
export const getAllLeaves = async(req, res, next) => {
    const { id } = req.params;

    let sqlQuery = `SELECT * FROM leaves`;

    const [leaves, fields] = await pool.query(sqlQuery, [id]);

    //Request has succeeded
    res.status(200).json({

        status: 'success',
        results: leaves.length,
        leaves: leaves
    });
}

//Retrieves one single Student from database
export const viewLeave = async(req, res, next) => {

    const { id } = req.params


    const [leaves, fields] = await pool.query("SELECT * FROM leaves WHERE LeaveId = ?", [id])
        //Error handling to check for existance of a record
    if (leaves.length <= 0) {
        res.status(404).json({

            status: 'error',
            message: 'Record not found',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({

            status: 'success',
            results: leaves.length,
            data: { leaves }
        });
    }

}

export const addLeave = async(req, res, next) => {
    const { EmployeeId, LeaveDate, LeaveReason, NoOfFullDayLeaves, NoOfHalfDayLeaves } = req.body

    const sqlQuery = `INSERT INTO leaves (EmployeeId, LeaveDate, LeaveReason, NoOfFullDayLeaves, NoOfHalfDayLeaves)
                    VALUES (?, ?, ?, ?, ?)`

    const [leaves, fields] = await pool.query(sqlQuery, [EmployeeId, LeaveDate, LeaveReason, NoOfFullDayLeaves, NoOfHalfDayLeaves])

    //Request has succeeded and one or multiple resource being created
    res.status(201).json({

        status: 'success',
        insertId: leaves.insertId,
    });
}


//Updates data in the Student table of the database
export const updateLeave = async(req, res, next) => {

    const { EmployeeId, LeaveDate, LeaveReason, NoOfFullDayLeaves, NoOfHalfDayLeaves } = req.body

    const { id } = req.params

    const sqlQuery = `UPDATE leaves SET EmployeeId = ?, LeaveDate = ?, LeaveReason = ?, NoOfFullDayLeaves = ?, NoOfHalfDayLeaves = ?
                    WHERE LeaveId = ?`

    const [leaves, fields] = await pool.query(sqlQuery, [EmployeeId, LeaveDate, LeaveReason, NoOfFullDayLeaves, NoOfHalfDayLeaves, id]);

    //Error handling to check for existance of a record
    if (leaves.affectedRows == 0) {
        res.status(404).json({
            status: 'error',
            messages: 'Unable to update',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({
            status: 'Record successfully updated',
            insertId: leaves.affectedRows,

        });
    }

}


//Delete row from Student table of the database
export const deleteLeave = async(req, res, next) => {

    const { id } = req.params

    const [leaves, fields] = await pool.query("DELETE from student WHERE LeaveId = ?", [id])

    //Error handling to check for existance of a record
    if (leaves.affectedRows == 0) {
        res.status(404).json({
            status: 'error',
            messages: 'Unable to delete',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({
            status: 'Record successfully created',
            insertId: leaves.affectedRows,

        });
    }

}