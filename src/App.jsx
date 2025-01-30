import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoItem from "./TodoItem";
import useSWR from "swr";
import NewItem from "./NewItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Implement fetcher from https://swr.vercel.app/docs/getting-started

  const fetcher = (...args) =>
    fetch(...args).then((res) =>
      res.json().then((data) => {
        console.log(data);
        let arr = [];
        data.map((item) => {
          if (item === null) {
            return;
          } else {
            arr.push(item);
          }
        });
        setTodos(arr);
        console.log(todos);
      })
    );
  const { data, error, isLoading } = useSWR(
    "https://todo-list-sa-default-rtdb.firebaseio.com/.json",
    fetcher
  );

  // Toggle done function

  function toggleDone(name) {
    console.log(name);
    const updated = todos.map((todo) => {
      if (todo.name === name) {
        if (todo.done === true) {
          todo.done = false;
          return todo;
        } else {
          todo.done = true;
          return todo;
        }
      }
      // in all other cases, keep it as it was
      return todo;
    });
    return updated;
  }

  // Edit task function

  function editTask(name) {
    setEditMode(true);
    const getTask = todos.find((todo) => todo.name === name);
    console.log(getTask);
    setTodos(deleteTask(getTask.name));
    setTaskName(getTask.name);
    console.log(taskName);
    setTaskDescription(getTask.task);
    console.log(taskDescription);
  }

  // Deletet task function:

  function deleteTask(name) {
    const filtered = todos.filter((todo) => todo.name !== name);
    console.log(filtered);
    return filtered;
  }

  function saveToBackend() {
    fetch("https://todo-list-sa-default-rtdb.firebaseio.com/.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todos),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  // Change handlers for new task

  function handleNameChange(event) {
    setTaskName(event.target.value);
  }

  function handleTaskChange(event) {
    setTaskDescription(event.target.value);
  }

  // on form submit function

  function onFormSubmit(event) {
    event.preventDefault();

    const updatedTasks = [
      ...todos,
      { done: false, name: taskName, task: taskDescription },
    ];
    setTodos(updatedTasks);
    setEditMode(false);
  }

  // ---------------------------------------------------------------------------------------

  return (
    <>
      <NewItem
        editMode={editMode}
        name={taskName}
        task={taskDescription}
        handleNameChange={handleNameChange}
        handleTaskChange={handleTaskChange}
        onFormSubmit={onFormSubmit}
      />
      <hr />
      <h2>Task List:</h2>
      {console.log(todos)}
      {todos.map((todo) =>
        todo ? (
          <TodoItem
            key={todo.name}
            todo={todo}
            done={() => setTodos(toggleDone(todo.name))}
            delete={() => setTodos(deleteTask(todo.name))}
            edit={() => editTask(todo.name)}
          />
        ) : (
          ""
        )
      )}
      <button onClick={saveToBackend}>Save to Server</button>
    </>
  );
}

export default App;
