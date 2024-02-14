// TodoApp.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, updateTodo } from './store/Todo_slice';
import './App.css'; // Import your CSS file

const TodoApp = () => {
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [editModeId, setEditModeId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      dispatch(
        addTodo({
          id: Math.random(),
          text,
          completed: false,
        })
      );
      setText('');
    }
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const handleDeleteAllTodos = () => {
    todos.forEach(todo => {
      dispatch(deleteTodo(todo.id));
    });
  };

  const handleEditTodo = (id, text) => {
    setEditModeId(id);
    setEditText(text);
  };

  const handleUpdateTodo = id => {
    dispatch(
      updateTodo({
        id,
        text: editText,
      })
    );
    setEditModeId(null);
  };

  return (
    <div className="container">
      <h1 className="text-8xl text-center font-bold mb-12 text-purple-950">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border-gray-950 border rounded px-8 py-6 w-screen mr-2"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter your todo"
        />
        <button
          className="bg-blue-500 text-cyan-800 font-bold py-2 px-4 rounded mr-2 w-60"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
        <button
          className="bg-red-500 text-red-800 font-bold py-2 px-4 rounded w-60"
          onClick={handleDeleteAllTodos}
        >
          Delete All
        </button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {editModeId === todo.id ? (
              <>
                <input
                  type="text"
                  className="border-gray-300 border rounded px-2 py-1 w-full mr-8"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white font-bold py-2 px-5"
                  onClick={() => handleUpdateTodo(todo.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className={`todo-text ${todo.completed ? 'line-through' : ''}`}
                  onClick={() => handleToggleTodo(todo.id)}
                >
                  {todo.text}
                </span>
                <div className="todo-actions">
                  <button
                    className="bg-green-700 text-white font-bold rounded w-20 "
                    onClick={() => handleEditTodo(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-black text-white font-bold rounded w-20"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
