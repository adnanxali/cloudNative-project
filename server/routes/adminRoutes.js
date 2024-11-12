const express = require('express');
const adminRouter = express.Router();
const {adminLogin,adminSignup} = require('../controllers/adminControllers')
adminRouter.post('/login',adminLogin);
adminRouter.post('/register',adminSignup);

module.exports=adminRouter;