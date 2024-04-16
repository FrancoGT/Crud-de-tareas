const express = require('express');

// Importando controladores
const taskController = require('../controllers/task.controller');

const router = express.Router();

// Rutas para las tareas
router.get('/tasks', taskController.getTasks); // Obtener todas las tareas
router.post('/tasks', taskController.addTask); // Agregar una nueva tarea
router.put('/tasks/:taskId', taskController.updateTask); // Actualizar una tarea
router.delete('/tasks/:taskId', taskController.deleteTask); // Eliminar una tarea

module.exports = router;