const express = require('express');
const mainRouter = express.Router();
const employeeRouter = require('./employessRoutes')
const adminRouter = require('../routes/adminRoutes');
mainRouter.use('/employee',employeeRouter);
mainRouter.use('/admin',adminRouter);

module.exports = mainRouter;
