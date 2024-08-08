const projects = require('../Schemas/projectSchema')
exports.addTask = async(request,response)=>{
     const{taskName,taskDescription}= request.body;
    const  projectId = request.params.id;
    const userId = request.payload
    try {
        const project = await projects.findById(projectId)
        console.log(project.user._id.toString());
        
        if(project.user._id.toString() === userId.toString()){
            const newtask = {
                taskName,
                taskDescription
            }
            project.task.push(newtask);
            await project.save()
          response.status(200).json({status:200,message:'New task Created'})  
        }else{
            response.status(403).send("UnAuthorised")
        }        
    } catch (error) {
        response.status(500).send(error)
    }
}
exports.editTask = async (request, response) => {
    const { taskName, taskDescription, status } = request.body;
    const projectId = request.params.pid;
    const taskId = request.params.tid;
    const userId = request.payload;

    try {
        const project = await projects.findById(projectId);
        if (project && project.user._id.toString() === userId.toString()) {
            const task = project.task.id(taskId); 
            if (task) {
                // Updating
                if (taskName) task.taskName = taskName;
                if (taskDescription) task.taskDescription = taskDescription;
                if (status !== undefined) task.status = status;
                await project.save(); 
                response.status(200).json({ status: 200, message: 'Task updated successfully' });
            } else {
                response.status(404).json({ status: 404, message: 'Task not found' });
            }
        } else {
            response.status(403).json({ status: 403, message: 'Unauthorized' });
        }
    } catch (error) {
        response.status(500).json({ status: 500, message: 'Server error', error });
    }
};
//delete task
exports.deleteTask = async (request, response) => {
    const projectId = request.params.pid;
    const taskId = request.params.tid;
    const userId = request.payload;
    try {
        const project = await projects.findById(projectId);
        if (project && project.user._id.toString() === userId.toString()) {
            project.task = project.task.filter(task => task._id.toString() !== taskId);
            await project.save(); 
            response.status(200).json({ status: 200, message: 'Task deleted successfully' });
        } else {
            response.status(403).json({ status: 403, message: 'Unauthorized' });
        }
    } catch (error) {
        response.status(500).json({ status: 500, message: 'Server error', error });
    }
};
//get all task
exports.getAllTask = async (request, response) => {
    const projectId = request.params.id;
    const userId = request.payload;
    try {
        const project = await projects.findById(projectId);
        if (project && project.user._id.toString() === userId.toString()) {
            response.status(200).json({ status: 200, tasks: project.task });
        } else {
            response.status(403).json({ status: 403, message: 'Unauthorized or project not found' });
        }
    } catch (error) {
        response.status(500).json({ status: 500, message: 'Server error', error });
    }
};