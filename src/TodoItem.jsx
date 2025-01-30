function TodoItem(props) {
  return (
    <div>
      <p>Task name: {props.todo.name}</p>
      <p>Description: {props.todo.task}</p>
      {props.todo.done ? <p>Task done!</p> : <p>Not done yet...</p>}
      <button onClick={props.done}>Toggle Done</button>
      <button onClick={props.edit}>Edit</button>
      <button onClick={props.delete}>Delete</button>

      <hr />
    </div>
  );
}

export default TodoItem;
