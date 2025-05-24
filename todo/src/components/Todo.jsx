import React, { useState } from "react";
import "../App.css";
const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (input.trim() === "") {
      return;
    }
    const data = {
      id: todos.length + 1,
      text: input,
      completed: false,
    };
    setTodos((prevTodo) => [...prevTodo, data]);
    setInput("");
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

  const startEditing = (id, currentText) => {
    setEditId(id);
    setEditValue(currentText);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === "") {
      return;
    }
    setTodos((todos) =>
      todos.map((t) => (t.id === id ? { ...t, text: editValue } : t))
    );
    setEditId(null);
    setEditValue("");
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") {
      return !t.completed;
    }
    if (filter === "complete") {
      return t.completed;
    }
    return true; //all
  });
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => addTodo()}>Add Todo</button>
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>active</button>
        <button onClick={() => setFilter("complete")}>Complete</button>
      </div>
      <ul>
        {filteredTodos.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompleted(t.id)}
            />
            {editId === t.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(t.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className={t.completed ? "strikeThrough" : ""}>
                  {t.text}
                </span>
                <button onClick={() => startEditing(t.id, t.text)}>Edit</button>
                <button onClick={() => deleteTodo(t.id)}>Del</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
