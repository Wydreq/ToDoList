import { useState, useEffect } from "react";
import classes from "./TasksList.module.css";

const TasksList = (props) => {
  const [isSortingUp, setIsSortingUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasksList, setTasksList] = useState([]);

  const sortingChangeHandler = () => {
    if (!isSortingUp) {
      setIsSortingUp(true);
      props.onSortingTasks(isSortingUp);
    } else if (isSortingUp) {
      setIsSortingUp(false);
      props.onSortingTasks(isSortingUp);
    }
  };

  async function fetchTasks() {
    setIsLoading(true);
    let response = await fetch(
      "https://todolist-4ab03-default-rtdb.firebaseio.com/tasks.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const loadedTasks = [];

    for (const key in data) {
      loadedTasks.push({
        id: key,
        enteredTitle: data[key].enteredTitle,
        enteredDescription: data[key].enteredDescription,
        enteredDate: data[key].enteredDate,
        isPriority: data[key].isPriority,
        isCompleted: data[key].isCompleted,
      });
    }

    setTasksList(loadedTasks);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

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
      {isLoading && <p>Loading tasks...</p>}
      {tasksList.length === 0 && !isLoading && <p>Tasks not found!</p>}
      <ul>
        {tasksList.map((task) => (
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
              {task.enteredTitle}
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
              {task.enteredDescription}
            </label>
            <br></br>
            <label
              className={
                task.isCompleted === false
                  ? classes.date
                  : classes.dateCompleted
              }
            >
              {task.enteredDate}
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
