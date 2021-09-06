import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

import "../styles/QuestionBox.css";
import "../styles/OptionBox.css";
import Context from '../store/pause-context.js';

function QuestionBox(props) {
  const { freezed } = useContext(Context);

  const { question, worthID, setWorthID } = props;
  const [seconds, setSeconds] = useState(45);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if(!freezed) { //I used '!freezed' because I set pause initially to false. 
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

  const quesCheck = (q) => {
    console.log(q);
  }
  
  function startGame() {

    return (
      <div className="">
   
        <div className="time">
            <p> {seconds} </p>
          </div>
  

        <div className="typeRacer">
          <div className="wordOutput">
           <p> Q {worthID}. {question.title} </p> 

           {quesCheck(question.title)}
        
          </div>


          {/* set timeout of 7s. */}
        </div>

      

      </div>
    );
  }

  return (
    <div id="inner1">
          {startGame()}
    </div>
  );
}

export default QuestionBox;

