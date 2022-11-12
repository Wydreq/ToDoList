import { useState } from "react";
import classes from "./AddTask.module.css";
import Prioritize from "./Prioritize";
import Date from "./Date";

const AddTask = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [isPriority, setIsPriority] = useState(false);
  const isCompleted = false;
  const [isLoading, setIsLoading] = useState(false);

  async function addTaskHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    if (enteredTitle.trim().length === 0 || enteredDate.trim().length === 0) {
      return;
    }

    const task = {
      id: Math.random().toString(),
      enteredTitle,
      enteredDescription,
      enteredDate,
      isPriority,
      isCompleted,
    };

    let response = await fetch(
      "https://todolist-4ab03-default-rtdb.firebaseio.com/tasks.json",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    console.log(data);

    setEnteredTitle("");
    setEnteredDescription("");
    setIsLoading(false);
  }

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const dateChangeHandler = (enteredDate2) => {
    setEnteredDate(enteredDate2);
    // console.log(enteredDate);
  };

  const priorityHandler = (priorityStatus) => {
    setIsPriority(priorityStatus);
  };

  return (
    <div className={classes.card}>
      <h2>
        What do You Have <p className={classes.todo}>ToDo</p>?
      </h2>
      <form onSubmit={addTaskHandler}>
        <input
          type="text"
          className={classes.input}
          placeholder="Title"
          onChange={titleChangeHandler}
          value={enteredTitle}
        />
        <textarea
          rows="10"
          className={classes.inputDesc}
          placeholder="Description"
          onChange={descriptionChangeHandler}
          value={enteredDescription}
        />
        <div className={classes.connector}>
          <Date enteredDate2={dateChangeHandler} />
          <Prioritize onClick={priorityHandler} />
        </div>
        <button type="submit" className={classes.button}>
          {!isLoading ? "Add" : "Adding..."}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
