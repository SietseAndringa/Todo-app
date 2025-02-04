import "./TodoItem.css";

function TodoItem(props) {
  let className = "todo-item";
  if (props.todo.done) {
    className = "todo-item-done";
  }

  return (
    <li className={className}>
      <div className="task-title">
        <p className="bold-text">{props.todo.name}</p>
      </div>
      <div>
        <p className="task-description"> {props.todo.task}</p>
      </div>
      <div className="buttons-container">
        <button className="green" onClick={props.done}>
          {"\u2714"}
        </button>
        <button className="blue" onClick={props.edit}>
          {"\u270E"}
        </button>
        <button className="red" onClick={props.delete}>
          {"\u2716"}
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
