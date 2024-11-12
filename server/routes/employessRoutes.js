const express = require('express');
const { employeeLogin, employeeSignup, getEmployee, getEmployees,promoteEmployee,deleteEmployee,sendStatus } = require('../controllers/employeeControllers');
const verifyToken= require('../controllers/verifyToken');
const employeeRouter = express.Router();

employeeRouter.post('/login',employeeLogin);
employeeRouter.post('/register',employeeSignup);
employeeRouter.get('/allEmployee',getEmployees);
employeeRouter.get('/auth/check',verifyToken,sendStatus);
employeeRouter.delete('/delete/:id',deleteEmployee)
employeeRouter.get('/:id',getEmployee);
employeeRouter.put('/promote/:id',promoteEmployee);


  

module.exports = employeeRouter;