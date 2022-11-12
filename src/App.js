import { useState } from "react";
import AddTask from "./components/AddTask/AddTask";
import TasksList from "./components/TasksList/TasksList";
import TodayTasks from "./components/TodayTasks/TodayTasks";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [restart, setRestart] = useState(false);

  async function deleteTaskHandler(key) {
    console.log(key);
    let response = await fetch(
      `https://todolist-4ab03-default-rtdb.firebaseio.com/tasks/${key}.json`,
      {
        method: "DELETE",
      }
    );
    await response.json();
    setRestart(!restart);
  }

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
      <AddTask />
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
