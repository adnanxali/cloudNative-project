const mainRouter = require('./routes/mainRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Specify the frontend's origin
    credentials: true, // Allow cookies and credentials
  }));
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1',mainRouter);
mongoose.connect('mongodb+srv://adnanali11875:helloworld@cluster0.x93ce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("Connect to db");
})
app.listen(3000,()=>{
    console.log("Listening on port 3000");
})