const projects = require('../Schemas/projectSchema');
//add project of User
exports.createProject = async (request,response)=>{
    const {projectTitle,projectDescription} = request.body;
    try{const userId = request.payload
    const newProject = new projects({
        projectTitle,
        projectDescription,
        user:userId
    });
    await newProject.save();
    response.status(200).json({status:200,message:'New Project Added'})
}
    catch(error){
        response.status(500).send(error)
    }
}
//get allProjets of user
exports.getAllProjects = async (request, response) => {
    try {
        const userId = request.payload;
        const allProjects = await projects.find({ user: userId });

        if (allProjects && allProjects.length > 0) {
            response.status(200).json({ allProjects });
        } else {
            response.status(200).json({ message: "No projects found" });
        }
    } catch (error) {
        response.status(500).json({ status: 500, message: 'Server error', error });
    }
};

//update project
exports.editProject = async (request, response) => {
    const projectId = request.params.id; 
    const { projectTitle, projectDescription } = request.body; 
    try {
        const project = await projects.findById(projectId);

        if (project) {
            project.projectTitle = projectTitle;
            project.projectDescription = projectDescription;
            await project.save();
            response.status(200).json({ status: 200, message: 'Project Updated Successfully', project });
        } else {
            response.status(404).json({ status: 404, message: 'Project Not Found' });
        }
    } catch (error) {
        response.status(500).json({ status: 500, message: 'Server Error', error });
    }
};

//delete Project
exports.deleteProject = async (request, response) => {
    const projectId = request.params.id; 
    try {
        const deletedProject = await projects.findByIdAndDelete(projectId);
        if (deletedProject) {
            response.status(200).json({ status: 200, message: 'Project Deleted Successfully' });
        } else {
            response.status(404).json({ status: 404, message: 'Project Not Found' });
        }
    } catch (error) {
        response.status(500).json({ status: 500, message: 'Server Error', error });
    }
};
