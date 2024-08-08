const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(connectionString).then(()=>{
    console.log('DataBase Connection Established');
    
}).catch((error)=>{
    console.log(`Connection error \n ${error}`);
    
})
