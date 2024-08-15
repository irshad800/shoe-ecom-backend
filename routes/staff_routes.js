const express = require("express");
const staffDB = require("../models/staff_schema");
 const staff_routes = express.Router();

 
staff_routes.post('/addStaff', async (req, res) => {
    try {
        const { name, age, role } = req.body;  
        const newStaff = new staffDB({
            name: name,
            age: age,
            role: role
        });

        const data = await newStaff.save();
        if (data) {
            return res.status(201).json({
                Success: true,
                Error: false,
                Message: 'Data added successfully',
                data: data,
            });
        } else {
            return res.status(400).json({
                Error: true,
                Success: false,
                Message: 'Error, Data not added',
            });
        }
    } catch (error) {
        return res.status(500).json({
            Error: true,
            Success: false,
            Message: 'Internal server error',
            ErrorMessage: error.message,
        });
    }
});

 
staff_routes.get('/viewStaff', async (req, res) => {
    try {
        const data = await staffDB.find();
        return res.status(200).json({
            Success: true,
            Error: false,
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            Success: false,
            Error: true,
            ErrorMessage: error.message,
        });
    }
});

 
staff_routes.put('/updateStaff/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, salary } = req.body;

        const updatedData = {
            name: name,
            position: position,
            salary: salary
        };

        const data = await staffDB.findByIdAndUpdate(id, updatedData, { new: true });

        if (data) {
            return res.status(200).json({
                Success: true,
                Error: false,
                Message: 'Data updated successfully',
                data: data,
            });
        } else {
            return res.status(400).json({
                Error: true,
                Success: false,
                Message: 'Error, Data not updated',
            });
        }
    } catch (error) {
        return res.status(500).json({
            Error: true,
            Success: false,
            Message: 'Internal server error',
            ErrorMessage: error.message,
        });
    }
});

 
staff_routes.delete('/deleteStaff/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const data = await staffDB.findByIdAndDelete(id);

        if (data) {
            return res.status(200).json({
                Success: true,
                Error: false,
                Message: 'Data deleted successfully',
                data: data,
            });
        } else {
            return res.status(400).json({
                Error: true,
                Success: false,
                Message: 'Error, Data not deleted',
            });
        }
    } catch (error) {
        return res.status(500).json({
            Error: true,
            Success: false,
            Message: 'Internal server error',
            ErrorMessage: error.message,
        });
    }
});

module.exports = staff_routes;
