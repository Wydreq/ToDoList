import classes from "./TodayTasks.module.css";

const TodayTasks = (props) => {
  const current = new Date();
  let counter = 0;

  let curDate = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-0${current.getDate()}`;

  const newTasksList = props.tasks.filter(
    (current) => current.date === curDate
  );

  return (
    <div className={classes.card}>
      <label className={classes.labelUpcoming}>Tasks for today</label>

      <svg
        onClick={() => {
          if (counter < newTasksList.length - 1) {
            counter++;
            console.log(newTasksList.length);
            console.log(counter);
          }
        }}
        className={classes.topArrow}
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.70711 0.292894C8.31658 -0.0976307 7.68342 -0.0976313 7.29289 0.292893L0.928928 6.65685C0.538403 7.04737 0.538403 7.68054 0.928927 8.07106C1.31945 8.46159 1.95262 8.46159 2.34314 8.07106L8 2.41421L13.6568 8.07107C14.0474 8.4616 14.6805 8.4616 15.0711 8.07107C15.4616 7.68055 15.4616 7.04739 15.0711 6.65686L8.70711 0.292894ZM9 2L9 1L7 0.999999L7 2L9 2Z"
          fill="#343434"
        />
      </svg>

      <svg
        onClick={() => {
          if (counter > 0) {
            counter--;
            console.log(newTasksList.length);
            console.log(counter);
          }
        }}
        className={classes.bottomArrow}
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95263 15.4616 1.31946 15.0711 0.928939C14.6805 0.538414 14.0474 0.538413 13.6569 0.928937L8 6.58579L2.34315 0.928927C1.95263 0.538402 1.31946 0.538402 0.928938 0.928926C0.538413 1.31945 0.538412 1.95261 0.928936 2.34314L7.29289 8.70711ZM7 7L7 8L9 8L9 7L7 7Z"
          fill="#343434"
        />
      </svg>

      <ul>
        {newTasksList.length === 0 ? (
          <div className={classes.item}>
            <p className={classes.title2}>No tasks for today!</p>
          </div>
        ) : (
          console.log("NIEPUSTE")
        )}
        {newTasksList.length !== 0 ? (
          <div
            key={newTasksList[0].id}
            className={
              newTasksList[0].isPriority ? classes.itemPriority : classes.item
            }
          >
            <label className={classes.title}>{newTasksList[0].title}</label>
            {newTasksList[0].isPriority ? (
              <i className="fa-solid fa-flag"></i>
            ) : (
              ""
            )}
            <label className={classes.date}>{newTasksList[0].date}</label>
          </div>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default TodayTasks;
