const projects = require('../Schemas/projectSchema');

// Add Task
exports.addTask = async (request, response) => {
    const { taskName, taskDescription } = request.body;
    const projectId = request.params.id;
    const userId = request.payload;

    try {
        const project = await projects.findById(projectId);

        if (project && project.user._id.toString() === userId.toString()) {
            const newTask = {
                taskName,
                taskDescription
            };
            project.task.push(newTask);
            await project.save();
            response.status(200).json({ status: 200, message: 'New task created' });
        } else {
            response.status(403).json({ status: 403, message: 'Unauthorized' });
        }
    } catch (error) {
        response.status(500).json({ status: 500, message: 'Server error', error });
    }
};

// Edit Task
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

// Delete Task
exports.deleteTask = async (request, response) => {
    const projectId = request.params.projectId;
    const taskId = request.params.taskId;
    const userId = request.payload;
    console.log("hi");
    
console.log(projectId,taskId,userId);

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

// Get All Tasks
exports.getAllTask = async (request, response) => {
    const projectId = request.params.projectId;
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
