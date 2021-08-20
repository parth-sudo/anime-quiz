import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

import "../styles/QuestionBox.css";
import OptionHandler from "./OptionHandler.js";
import Context from '../store/pause-context.js';

function QuestionBox(props) {
  const { timerPaused, setTimerPaused } = useContext(Context);

  const { question, worthID, setWorthID } = props;

  const [animation, setAnimation] = useState(null);

  const [seconds, setSeconds] = useState(30);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if(!timerPaused) { //I used '!paused' because I set pause initially to false. 
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  
  // const handlePauseToggle = () => {
  //   setTimerPaused(!timerPaused);
  // }
  
  function startGame() {

    return (
      <div className="typeRacer">
        <div style = {{animation : animation !== null ? animation : ""}} className="time">
          <p> {seconds} </p>
        </div>

        <div className="typeRacer">
          <div className="wordOutput">
            <p> Q {worthID}. {question.title} </p>
          </div>

          {/* set timeout of 7s. */}
        </div>
      </div>
    );
  }

  return (
    <div className="typeRacer">
          {startGame()}
    </div>
  );
}

export default QuestionBox;

