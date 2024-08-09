const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true,
        default:false
        //true:Completed,
        //false:Incompleted
    },
    taskDescription:{
        type:String,

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        defulat:Date.now
    }
})
const projectSchema = new mongoose.Schema({
    projectTitle : {
        type:String,
        require:true
    },
    projectDescription:{
        type:String,
        require:true
    },
    projectStatus:{
        type:Boolean,
        //true:Completed,
        //false:Incompleted
        default:false
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users',
       require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    task:{
        type:[taskSchema]
    }
});
const projects = mongoose.model('projects',projectSchema);
module.exports = projects;
