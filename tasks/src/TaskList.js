import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); 
  const [editingTaskDescription, setEditingTaskDescription] = useState(''); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTaskDescription.trim()) {
      console.warn('No puedes dejar este campo vacío.');
      return;
    }

    console.log('Descripción de la nueva tarea:', newTaskDescription); 

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        task_description: newTaskDescription, 
      });
      setTasks([...tasks, response.data.data]);
      setNewTaskDescription('');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };
  
  const handleUpdateTaskDescription = async (taskId, newDescription) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        task_description: newDescription,
      });
      setTasks(tasks.map(task => 
        task.task_id === taskId ? { ...task, task_description: newDescription } : task
      ));
      setEditingTaskId(null);
      setEditingTaskDescription('');
    } catch (error) {
      console.error('Error al actualizar la descripción de la tarea:', error);
    }
  };
  
  const handleCompleteTask = async (taskId, completed) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        completed: completed,
      });
      setTasks(tasks.map(task => 
        task.task_id === taskId ? { ...task, completed: completed } : task
      ));
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };


  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.task_id !== taskId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div className="task-list-container">
      <h1>Lista de Tareas</h1>
      <div className="add-task-container">
        <TextField
          label="Descripción de la Tarea"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={handleAddTask}>Agregar Tarea</Button>
      </div>
      <div className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.task_id}>
                <td>
                  {editingTaskId === task.task_id ? (
                    <>
                      <TextField
                        value={editingTaskDescription || task.task_description} // Mostrar la descripción actual al editar
                        onChange={(e) => setEditingTaskDescription(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateTaskDescription(task.task_id, editingTaskDescription)}
                        style={{ marginRight: '5px' }} // Espacio entre botones
                      >
                        Confirmar Cambio
                      </Button>
                    </>
                  ) : (
                    task.task_description
                  )}
                </td>
                <td>{task.completed ? 'Completada' : 'Pendiente'}</td>
                <td>
                  {editingTaskId === task.task_id ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateTaskDescription(task.task_id, editingTaskDescription)}
                        style={{ marginRight: '5px' }} // Espacio entre botones
                      >
                        Confirmar Cambio
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setEditingTaskId(null)}
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setEditingTaskId(task.task_id)}
                        style={{ marginRight: '5px' }}
                      >
                        Editar Descripción
                      </Button>
                      <Button
						  variant="contained"
						  style={{ backgroundColor: task.completed ? 'gray' : 'green', marginRight: '5px' }}
						  onClick={() => handleCompleteTask(task.task_id, !task.completed)}
						>
						  {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
						</Button>
                        
					  <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteTask(task.task_id)}
                        style={{ marginRight: '5px' }}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;