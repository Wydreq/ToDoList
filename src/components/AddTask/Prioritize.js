import { useState } from "react";
import classes from "./Prioritize.module.css";

const Prioritize = (props) => {
  const [isPriority, setIsPriority] = useState(true);

  const prioritizeHandler = (event) => {
    event.preventDefault();
    if (!isPriority) {
      setIsPriority(true);
    } else {
      setIsPriority(false);
    }

    props.onClick(isPriority);
  };

  return (
    <div className={classes.prio}>
      <button className={classes.button} onClick={prioritizeHandler}>
        <label>Prioritize?</label>
        <i
          className={isPriority ? "fa-regular fa-flag " : "fa-solid fa-flag"}
        ></i>
      </button>
    </div>
  );
};

export default Prioritize;
