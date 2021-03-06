import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

import "../styles/QuestionBox.css";
import "../styles/OptionBox.css";
import Context from '../store/pause-context.js';
import tiktokTimer from '../soundEffects/timer45.mp3';
import intro from '../soundEffects/intro.mp3';
import suspense from '../soundEffects/suspense.mp3';

function QuestionBox(props) {


  const { freezed } = useContext(Context);

  const { question, worthID, TL} = props;
  const [seconds, setSeconds] = useState(45);
  const [timerCalled, setTimerCalled] = useState(false);
  const [tiktok, setTiktok] = useState(new Audio(tiktokTimer));
  const [showQues, setShowQues] = useState(false);
 
  
  useEffect(() => {
    let questune = new Audio(intro);
    questune.play();
    const timer = setTimeout(() => setShowQues(true), 4000); // change ms here
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log(TL + 7000);
    const delay = TL + 7000;

    if(worthID < 11) {
      const timer = setTimeout(() => setTimerCalled(true), delay); // change ms here.
      return () => clearTimeout(timer);
    }

  }, [worthID]);

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
   
  }, [timerCalled, freezed, tiktok, worthID]);

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
  
       {worthID < 11 ? callTimer() : null}

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
          {showQues ? startGame() : null}
    </div>
  );
}

export default QuestionBox;

