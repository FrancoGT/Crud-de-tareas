const Task = require('../models/task.model');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the tasks.',
            data: tasks,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const addTask = async (req, res) => {
    const { task_description } = req.body;

    if (!task_description) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Description is required.',
            data: null,
        });
    }

    try {
        const newTask = await Task.create({
            task_description,
        });

        res.status(201).send({
            statusCode: 201,
            statusMessage: 'Created',
            message: 'Task created successfully.',
            data: newTask,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { completed } = req.body;

    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).send({
                statusCode: 404,
                statusMessage: 'Not Found',
                message: 'Task not found.',
                data: null,
            });
        }

        await task.update({
            completed,
        });

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Task updated successfully.',
            data: task,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).send({
                statusCode: 404,
                statusMessage: 'Not Found',
                message: 'Task not found.',
                data: null,
            });
        }

        await task.destroy();

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Task deleted successfully.',
            data: null,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
};