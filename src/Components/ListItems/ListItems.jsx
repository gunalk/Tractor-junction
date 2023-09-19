import React, { useState, useEffect } from 'react';
import "./ListItems.css"

function ListItems() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const API_URL="https://dummyjson.com/todos"
    
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) =>setTasks(data.todos))
      .catch((err)=>console.log(err))
      
  }, []);

  const handleCreateTask = () => {
    
    if (newTask.trim() !== '') {
      const newTaskdetails = {
        id: tasks.length ?tasks[tasks.length-1].id+1:1,
        todo: newTask,
        completed: false,
      };
      tasks.unshift(newTaskdetails)
      setNewTask('');

    }

    
  };

  const handleUpdateTask = (id, newText) => {
    if (newText.trim() !== '') {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, todo: newText } : task
    );
    setTasks(updatedTasks);}
    else{
      alert("please enter the task")
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='outer-container'>
      <div className='input'>
      <input
        className='form-control'
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
       <button className="input-button btn btn-primary " onClick={handleCreateTask}>Add</button></div>
     
      <ul  className=" list list-group">
        {tasks.map((task) => (
          <li id="list-items" key={task.id} className={task.completed ? 'completed list-group-item' : 'list-group-item'}>
            {task.todo}
            <button  className="add btn btn-primary" onClick={() => handleUpdateTask(task.id, prompt('Edit task:', task.text))}>
              Update
            </button>
            <button  className="add btn btn-warning" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <input
              className='check-box'
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
