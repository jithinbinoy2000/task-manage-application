require('dotenv').config();
require('./Connection.js/dbConnection')
const cros = require('cors')
const express = require('express');
const router = require('./Routes/routes')
const session = require('express-session')
const app = express();
const port = process.env.PORT || 3000
app.use(cros());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(router)
app.listen(port,()=>{
    console.log(`Server Starting at PORT ${port}`);
    
})
app.get('/',(request,response)=>{
    response.send('<h1>Server Running </h1>')
})