import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TaskList from './TaskList';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaskList />
  </React.StrictMode>
);

// Si deseas comenzar a medir el rendimiento de tu aplicación, puedes utilizar reportWebVitals.
reportWebVitals();