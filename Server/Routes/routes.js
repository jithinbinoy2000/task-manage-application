const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const verifyMiddleware = require('../Middleware/verifyMiddleware')
const taskController = require('../Controllers/taskController')
 //register new User API
 router.post('/register',userController.registerUser);
 router.post('/login',userController.logInUser);
 router.post('/add-project',verifyMiddleware.verifyMiddleware,projectController.createProject)
 router.get('/projects', verifyMiddleware.verifyMiddleware,projectController.getAllProjects)
 router.delete('/delete-project/:projectId',verifyMiddleware.verifyMiddleware,projectController.deleteProject)
 router.put('/edit-project/:id',verifyMiddleware.verifyMiddleware,projectController.editProject)

 router.post('/add-task/:id',verifyMiddleware.verifyMiddleware,taskController.addTask)
 router.patch('/edit-task/:pid/:tid',verifyMiddleware.verifyMiddleware,taskController.editTask)
 router.delete('/delete-task/:projectId/:taskId',verifyMiddleware.verifyMiddleware,taskController.deleteTask)
 router.get('/task/:projectId',verifyMiddleware.verifyMiddleware,taskController.getAllTask)
 module.exports = router;