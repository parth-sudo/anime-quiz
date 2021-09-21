import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

import "../styles/QuestionBox.css";
import "../styles/OptionBox.css";
import Context from '../store/pause-context.js';
import tiktokTimer from '../soundEffects/timer.mp3';

function QuestionBox(props) {
  const { freezed } = useContext(Context);

  const { question, worthID, TL} = props;
  const [seconds, setSeconds] = useState(30);
  const [timerCalled, setTimerCalled] = useState(false);
  const [tiktok, setTiktok] = useState(new Audio(tiktokTimer));

  useEffect(() => {
    const timer = setTimeout(() => setTimerCalled(true), TL);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(timerCalled === true) {
  
      const interval = setInterval(() => {
        if(!freezed && timerCalled) { 
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
        }
      }, 1000);
      return () => clearInterval(interval);

    } 
 
  }, [timerCalled, seconds, freezed]);


  useEffect(() => {
    if(seconds === 0) {
      props.timeUpCheck(0);
    }
  }, [seconds]);

  useEffect(() => {
    if(timerCalled) {
      tiktok.play();
      if(freezed) {
        tiktok.pause();
        return;
      }
      console.log("question box third use effect in play")
    }
  }, [timerCalled, freezed]);

  const callTimer = () => {
    console.log("timer called");
     return (
        <div className="time">
        <p> {seconds} </p>
        </div>
     )
  }

  
  function startGame() {

    return (
      <div className="">

      {/* timeout */}
       {callTimer()}
       {/* {callTimer()} */}

        <div className="typeRacer">
          <div className="wordOutput">
           
           {/* {timeOutLength(question.title)} */}
           <p> Q {worthID}. {question.title} </p> 
        
          </div>

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

