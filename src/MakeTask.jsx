import "./MakeTask.css";

function MakeTask(props) {
  return (
    <>
      <div className="make-task">
        {props.editMode ? <h2>Edit task</h2> : <h2>Add new task</h2>}
        <form onSubmit={props.onFormSubmit}>
          <div className="input-container">
            <label className="label" htmlFor="task-name">
              Task name:
            </label>
            <input
              type="text"
              value={props.name}
              onChange={props.handleNameChange}
              id="task-name"
              placeholder="Enter the task name"
              required
              className="input"
            />

            {props.nameUsed ? (
              <span className="name-already-used">
                This task name is already used. <br /> The task name must be
                unique
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <label className="label" htmlFor="task-description">
              Task description:
            </label>
            <textarea
              type="text"
              value={props.task}
              onChange={props.handleDescriptionChange}
              id="task-description"
              placeholder="Enter the task description"
              className="input input-description"
            />
          </div>
          <div className="buttons-container">
            <button className="red" onClick={props.cancel}>
              Cancel
            </button>
            {props.editMode ? (
              <input type="submit" className="submit-btn" value="Update task" />
            ) : (
              <input
                type="submit"
                className="submit-btn"
                value="Add new task"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default MakeTask;
