const controllers = require("../controllers/tasks.controller");
const express = require("express");

const taskRoutes = express.Router();

taskRoutes.get('/', controllers.getAllTasks).post('/', controllers.createTask);

taskRoutes
    .get('/:taskId', controllers.getTask)
    .put('/:taskId', controllers.updateTask)
    .delete('/:taskId', controllers.deleteTask);

module.exports = taskRoutes;