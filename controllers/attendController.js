import { pool } from '../database/dbConnections.js';


//Retrieves all Attendance data from database
export const getAllAttendance = async(req, res, next) => {
    const { id } = req.params;

    let sqlQuery = `SELECT * FROM attendance`;

    const [attendance, fields] = await pool.query(sqlQuery);

    //Request has succeeded
    res.status(200).json({

        status: 'success',
        results: attendance.length,
        data: attendance
    });
}

//Retrieves one single Attendance from database
export const viewAttendance = async(req, res, next) => {

    const { id } = req.params


    const [attendance, fields] = await pool.query("SELECT * FROM attendance WHERE AttendanceId = ?", [id])
        //Error handling to check for existance of a record
    if (attendance.length <= 0) {
        res.status(404).json({

            status: 'error',
            message: 'Record not found',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({

            status: 'success',
            results: attendance.length,
            data: { attendance }
        });
    }

}

//Creates and inserts an Attendance into the database
export const addAttendance = async(req, res, next) => {
    const { EmployeeId, AttendanceDate, InTime, OutTime, IsFullDay } = req.body

    const sqlQuery = `INSERT INTO attendance (EmployeeId, AttendanceDate, InTime, OutTime, IsFullDay)
                    VALUES (?, ?, ?, ?, ?)`

    const [attendance, fields] = await pool.query(sqlQuery, [EmployeeId, AttendanceDate, InTime, OutTime, IsFullDay])

    //Request has succeeded and one or multiple resource being created
    res.status(201).json({

        status: 'success',
        insertId: attendance.insertId,
    });
}


//Updates data in the Attendance table of the database
export const updateAttendance = async(req, res, next) => {

    const { EmployeeId, AttendanceDate, InTime, OutTime, IsFullDay } = req.body

    const { id } = req.params

    const sqlQuery = `UPDATE attendance SET EmployeeId = ?, AttendanceDate = ?, InTime = ?, OutTime = ?, IsFullDay = ?
                    WHERE AttendanceId = ?`

    const [attendance, fields] = await pool.query(sqlQuery, [EmployeeId, AttendanceDate, InTime, OutTime, IsFullDay, id]);

    //Error handling to check for existance of a record
    if (attendance.affectedRows == 0) {
        res.status(404).json({
            status: 'error',
            messages: 'Unable to update',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({
            status: 'Record successfully updated',
            insertId: attendance.affectedRows,

        });
    }

}


//Delete row from Attendance table of the database
export const deleteAttendance = async(req, res, next) => {

    const { id } = req.params

    const [attendance, fields] = await pool.query("DELETE from attendance WHERE AttendanceId = ?", [id])

    //Error handling to check for existance of a record
    if (attendance.affectedRows == 0) {
        res.status(404).json({
            status: 'error',
            messages: 'Unable to delete',
        });
    } else {
        //Else the request has succeeded
        res.status(200).json({
            status: 'Record successfully created',
            insertId: attendance.affectedRows,

        });
    }

}