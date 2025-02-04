import { useState, useEffect } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import useSWR from "swr";
import MakeTask from "./MakeTask";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [nameUsed, setNameUsed] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewTaskMaker, setViewTaskMaker] = useState(false);

  // Implement fetcher from https://swr.vercel.app/docs/getting-started

  const fetcher = (...args) =>
    fetch(...args).then((res) =>
      res.json().then((data) => {
        // catch null from server
        let arr = [];
        data.map((item) => {
          if (item === null) {
            return;
          } else {
            arr.push(item);
          }
        });
        setTodos(arr);
      })
    );
  const { data, error, isLoading } = useSWR(
    "https://todo-list-sa-default-rtdb.firebaseio.com/.json",
    fetcher
  );

  if (error) {
    console.log("Server error");
  }

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
    setViewTaskMaker(true);
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

  // Change handlers for task inputs

  function handleNameChange(event) {
    setTaskName(event.target.value);
    setNameUsed(todos.some((todo) => todo.name === event.target.value)); // name validation
  }

  function handleDescriptionChange(event) {
    setTaskDescription(event.target.value);
  }

  // on form submit function

  function onFormSubmit(event) {
    event.preventDefault();

    if (nameUsed) {
      console.log("name used");
      return;
    }

    const updatedTasks = [
      { done: false, name: taskName, task: taskDescription },
      ...todos,
    ];
    setTodos(updatedTasks);
    setTaskName("");
    setTaskDescription("");
    setEditMode(false);
    setViewTaskMaker(false);
  }

  // ---------------------------------------------------------------------------------------

  return (
    <>
      {error ? (
        <div>
          <h2>Whoops! Something went wrong...</h2>
          <h3>Please try again later</h3>
        </div>
      ) : (
        <div>
          {viewTaskMaker ? (
            <MakeTask
              editMode={editMode}
              name={taskName}
              task={taskDescription}
              nameUsed={nameUsed}
              handleNameChange={handleNameChange}
              handleDescriptionChange={handleDescriptionChange}
              onFormSubmit={onFormSubmit}
              cancel={() => setViewTaskMaker(false)}
            />
          ) : (
            <div>
              <div className="header-container">
                <h2>Task List:</h2>
                <button
                  className="green"
                  onClick={() => setViewTaskMaker(true)}
                >
                  New task
                </button>
              </div>
              <ul>
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
              </ul>
              <button className="green" onClick={saveToBackend}>
                Save to Server
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
