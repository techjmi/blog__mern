var cookieParser = require('cookie-parser')
require("dotenv").config() 
const express = require('express');
const mongoDB = require("./db/database");
const path= require('path')
const app = express();
app.use(cookieParser())
const authRoutes= require('./routes/auth.routes') 
const UserRoutes=require('./routes/user.routes')
const PostRoutes=require('./routes/post.routes')
const PORT = process.env.PORT||8000;
const cors= require("cors")
app.use(cors()) 
var bodyParser = require('body-parser')
app.use(express.json())
// const __dirname = path.resolve();
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   console.log('Request cookies:', req.cookies);
//   next();
// });
mongoDB();
app.use('/api/auth', authRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/post', PostRoutes);
app.listen(PORT, () => {
    console.log(`The Server Is Running On Port ${PORT}`);
});  
app.use(express.static(path.join(__dirname, '/client/dist')));
//if address is not found then run this below
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use((err, req, res, next) => { 
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,  
      message,
    });
  }); 