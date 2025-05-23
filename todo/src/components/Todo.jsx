import React, { useState } from "react";
import "../App.css";
const Todo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodo = () => {
    if (value.trim() === "") {
      return;
    }
    const data = {
      id: todos.length + 1,
      text: value,
      completed: false,
    };
    setTodos((prevTodo) => [...prevTodo, data]);
    setValue("");
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            completed: !t.completed,
          };
        } else {
          return t;
        }
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => addTodo()}>Add Todo</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompleted(t.id)}
            />
            <span className={t.completed ? "strikeThrough" : ""}>{t.text}</span>
            <button onClick={() => deleteTodo(t.id)}>Del</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
