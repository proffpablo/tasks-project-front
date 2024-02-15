import { createContext, useContext, useState } from "react";
import axios from "../api/axios"

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context)  {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
}

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      res = axios.get('/tasks', { headers: { 'Authorization': token } });
      setTasks(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  const createTask = async (task) => {
    const token = localStorage.getItem('token');
    return axios.post('/tasks', task, { headers: { 'Authorization': token } });
  }

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      res = axios.delete(`/tasks/${id}`, { headers: { 'Authorization': token } });
      if (res.status === 204) setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = axios.get(`/tasks/${id}`, { headers: { 'Authorization': token } });
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async (id, task) => {
    try {
      const token = localStorage.getItem('token');
      return axios.put(`/tasks/${id}`, task, { headers: { 'Authorization': token } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TasksContext.Provider 
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}>
      {children}
    </TasksContext.Provider>
  )
}