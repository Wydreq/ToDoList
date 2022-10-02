import { useState } from "react";
import classes from "./TasksList.module.css";

const TasksList = (props) => {
  const [isSortingUp, setIsSortingUp] = useState(false);

  const sortingChangeHandler = () => {
    if (!isSortingUp) {
      setIsSortingUp(true);
      props.onSortingTasks(isSortingUp);
    } else if (isSortingUp) {
      setIsSortingUp(false);
      props.onSortingTasks(isSortingUp);
    }
  };

  return (
    <div className={classes.block}>
      <h2>
        <p className={classes.todo}>ToDo </p>List
      </h2>
      <div className={classes.sortingDiv}>
        <p>Sort by:</p>
        <button onClick={sortingChangeHandler}>
          Date{!isSortingUp ? <i className="fa-solid fa-arrow-up"></i> : ""}
          {isSortingUp ? <i className="fa-solid fa-arrow-down"></i> : ""}
        </button>
        {/* <button>
          Date<i class="fa-solid fa-arrow-down"></i>
        </button> */}
      </div>

      <ul>
        {props.tasks.map((task) => (
          <div
            key={task.id}
            className={
              task.isPriority === false
                ? classes.listItem
                : classes.listItemPriority
            }
          >
            <div
              className={classes.circle}
              onClick={() => {
                props.onStatusTask(task.id);
              }}
            ></div>
            <div
              className={
                task.isCompleted
                  ? classes.completeStatus
                  : classes.unCompleteStatus
              }
              onClick={() => {
                props.onStatusTask(task.id);
              }}
            >
              <i className="fa-solid fa-check"></i>
            </div>
            <button
              className={classes.smallButton}
              onClick={() => {
                props.onDeleteTask(task.id);
              }}
            >
              X
            </button>
            <label
              className={
                task.isCompleted === false
                  ? classes.title
                  : classes.titleCompleted
              }
            >
              {task.title}
            </label>
            <label
              className={
                task.isCompleted === false
                  ? classes.priorityStatus
                  : classes.priorityStatusCompleted
              }
            >
              {task.isPriority === true ? (
                <i className="fa-solid fa-flag"></i>
              ) : (
                ""
              )}
            </label>
            <br></br>
            <label
              className={
                task.isCompleted === false
                  ? classes.description
                  : classes.descriptionCompleted
              }
            >
              {task.description}
            </label>
            <br></br>
            <label
              className={
                task.isCompleted === false
                  ? classes.date
                  : classes.dateCompleted
              }
            >
              {task.date}
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
