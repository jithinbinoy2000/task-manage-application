const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }

})
const userModel = new mongoose.model('users',usersSchema);
module.exports = userModel