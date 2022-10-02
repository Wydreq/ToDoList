import { useState } from "react";
import AddTask from "./components/AddTask/AddTask";
import TasksList from "./components/TasksList/TasksList";
import TodayTasks from "./components/TodayTasks/TodayTasks";

function App() {
  const [tasksList, setTasksList] = useState([]);

  const addTaskHandler = (
    title,
    description,
    date,
    isPriority,
    isCompleted
  ) => {
    const current = new Date();

    let curDate = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-0${current.getDate()}`;

    // console.log(title, description, date);
    if (description.trim().length === 0) {
      description = "No description";
    }

    setTasksList((prevTasksList) => {
      return [
        ...prevTasksList,
        {
          title,
          description,
          date,
          isPriority,
          isCompleted,
          id: Math.random().toString(),
        },
      ];
    });
    // console.log(tasksList);
  };

  const deleteTaskHandler = (key) => {
    const updatedTasksList = tasksList.filter((current) => current.id !== key);
    setTasksList(updatedTasksList);
  };

  const changeTaskStatusHandler = (key) => {
    const updatedTasksList = tasksList.map((current) => {
      if (current.id === key) {
        if (current.isCompleted === false) {
          current.isCompleted = true;
        } else if (current.isCompleted === true) {
          current.isCompleted = false;
        }
        return current;
      }
      return current;
    });
    setTasksList(updatedTasksList);
  };

  const sortingTasksHandler = (isSortingUp) => {
    console.log(isSortingUp);
    if (isSortingUp) {
      tasksList.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    } else {
      tasksList.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    }
  };

  return (
    <div>
      <AddTask onAddTask={addTaskHandler} />
      <TasksList
        tasks={tasksList}
        onDeleteTask={deleteTaskHandler}
        onStatusTask={changeTaskStatusHandler}
        onSortingTasks={sortingTasksHandler}
      />
      <TodayTasks tasks={tasksList} />
    </div>
  );
}

export default App;
