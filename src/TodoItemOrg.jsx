function TodoItem(props) {
  //   conditional renderen
  return (
    <div>
      <p>name is: {props.name}</p>
      <p>What to do: {props.task}</p>
      {props.done ? <p>Task done!</p> : <p>Not done yet...</p>}
      <button
        onClick={() => {
          console.log("click");
        }}
      >
        Done
      </button>
      <hr />
    </div>
  );
}

export default TodoItem;
