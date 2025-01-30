// form
// state var voor name, task, done
// submit btn
// validation?

function NewItem(props) {
  return (
    <>
      {props.editMode ? <h2>Edit task</h2> : <h2>Add new task</h2>}
      <form onSubmit={props.onFormSubmit}>
        <div>
          <label htmlFor="task-name">Task name:</label>
          <input
            type="text"
            value={props.name}
            // defaultValue=""
            onChange={props.handleNameChange}
            id="task-name"
            placeholder="Enter the task name"
            className="textfield"
          />
        </div>
        <div>
          <label htmlFor="task-description">Task description:</label>
          <input
            type="text"
            value={props.task}
            // defaultValue=""
            onChange={props.handleTaskChange}
            id="task-description"
            placeholder="Enter the task description"
            className="textfield"
          />
        </div>
        {props.editMode ? (
          <input type="submit" value="Update task" />
        ) : (
          <input type="submit" value="Add new task" />
        )}
      </form>
    </>
  );
}

export default NewItem;
