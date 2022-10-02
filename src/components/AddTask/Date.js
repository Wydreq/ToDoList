import { useEffect, useState } from "react";
import classes from "./Date.module.css";

const Date = (props) => {
  const [enteredDate, setEnteredDate] = useState("");

  const changeDateHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && enteredDate) {
      props.enteredDate2(enteredDate);
    }
    return () => {
      isMounted = false;
    };
  }, [enteredDate, props]);

  return (
    <div className={classes.dateCard}>
      <input
        type="date"
        className={classes.date}
        onChange={changeDateHandler}
        value={enteredDate}
      ></input>
    </div>
  );
};

export default Date;
