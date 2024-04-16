// api.js
const BASE_URL = 'http://localhost:5000/api'; // Nueva ruta base

export async function fetchTasks() {
    try {
        const response = await fetch(`${BASE_URL}/tasks`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch tasks');
        }
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export async function addTask(description) {
    try {
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add task');
        }
        return data;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
}

export async function updateTask(taskId, completed) {
    try {
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update task');
        }
        return data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

export async function deleteTask(taskId) {
    try {
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}