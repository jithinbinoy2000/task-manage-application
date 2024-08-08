require('dotenv').config();
const cros = require('cors')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
app.use(cros())
app.use(express.json());

app.listen(port,()=>{
    console.log(`Server Starting at PORT ${port}`);
    
})
app.get('/',(request,response)=>{
    response.send('<h1>Server Running </h1>')
})