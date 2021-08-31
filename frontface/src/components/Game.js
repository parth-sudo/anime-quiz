import React, { useState, useEffect, createContext, useContext } from "react";
import Container from "./Container";
import QuestionBox from "./QuestionBox";
import Ladder from "./Ladder.js";
import OptionBox from "./OptionBox.js";
import Pause from "./Pause";
import "../styles/Game.css";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";
import {Link} from "react-router-dom";
import Context from '../store/pause-context.js';


export default function Game() {
  // get all choices, questions, worth.
  //
  const [worths, setWorths] = useState([]);
  const [choices, setChoices] = useState([]);
  const [questions, setQuestions] = useState([]);
  
  const [worthID, setWorthID] = useState(0);
  const [prevID, setPrevID] = useState(1);
  const [rightAnswer, setRightAnswer] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const [timerPaused, setTimerPaused] = useState(false);
  

  useEffect(() => {
    fetch("http://localhost:8000/api/list-worth/")
      .then((response) => response.json())
      .then((data) => {
        setWorths(data);
        console.log(data);
      });

    fetch("http://localhost:8000/api/list-q/")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        console.log(data);
      });

    fetch("http://localhost:8000/api/list-c/")
      .then((response) => response.json())
      .then((data) => {
        setChoices(data);
        console.log(data);
      });
  }, []);


  function boxHolder() {
    console.log("boxHolder rendering");
    const question_items = questions.filter((question) => {
      return question.worth === worthID;
    });
    const question = question_items[Math.floor(Math.random() * question_items.length)];

    const choice_items = choices.filter( 
      (choice) => choice.question === question.id
    );

    return (
      <Container>
        <Context.Provider value = {{timerPaused, setTimerPaused}}>
        <div id="wrapper">
          <QuestionBox worthID={worthID} 
          setWorthID={setWorthID}
          question={question}
          />

          <OptionBox choice_items={choice_items} 
          // setRightAnswer = {setRightAnswer}
          worthID = {worthID} 
          setWorthID={setWorthID}
          getResult = {getResult}
          />
         </div>
        </Context.Provider>
      </Container>
    )
  }

  // prop function.
  function getResult(isCorrect) {
    if(isCorrect) {
      // console.log(" func get result says absolutely true");
      setWorthID(worthID + 1);
    }
    else {
      setGameLost(true);
      console.log(gameLost);
      console.log("galat jawab hai lololol.");
    }

  }

  const alphabet = (id) => {
    if(id === 1) {
        return <span> A. </span>;
    }
    else if(id === 2) {
      return <span> B. </span>;
    }
    else if(id === 3) {
      return <span> C. </span>;
    }
    return <span> D. </span>;
}
 
 function gameLostMessage() {
  // const question_items = questions.filter((question) => {
  //   return question.worth === worthID;
  // });
  // const question = question_items[Math.floor(Math.random() * question_items.length)];
  // const choice_items = choices.filter( 
  //   (choice) => choice.question === question.id
  // );

  // let ans = null;
  // choice_items.map((choice) => {
  //   if(choice.is_correct) {
  //     ans = choice;
  //   }
  // })
    return (
      <div> 
        <h2 style={{backgroundColor: 'white', color: 'black'}}> Wrong! The correct answer is <i> {alphabet(null)} {null}</i>. </h2>
        <h3 style={{backgroundColor: 'white', color: 'black'}}> You take away ₹{amountWonOnLosing()} </h3>
        <Button color="secondary" to = "/" component={Link}> Back to Home </Button>
      </div>
    )
 }

 const amountWonOnLosing = () => {
  let i = worthID;
  if(i >= 5 && i < 10) {
    return worths[5].cost;
  }
  else if(i >= 10 && i < 15) {
    return worths[10].cost;
  }
  return 0; 
}

  function putNextQuestion() {
    console.log(worthID);
    return (
      <div style={{alignItems : 'center'}}> 
       <button style={{color: 'black'}} onClick={() => setRightAnswer(true)}> Right answer! Next</button>
     </div> 
   )
  }

  const resetStates = () => {
        if(rightAnswer) {
          setRightAnswer(false);
          setPrevID(worthID);
        }
  }

  function continueGame() {
    return (
      <div>

        {worthID === 1 ? boxHolder() : null}
        {prevID < worthID ? putNextQuestion() : null}
        {resetStates()}
        {prevID === worthID && prevID > 1 ? boxHolder() : null}

    </div>
    )
      
  }
 
  return (
    <div className="game">

      {/* {gameLost ? : } */}
    

      {/* ready button */}
      <div className="container"> 

      {worthID === 0 ? (
                <Button style={{alignItems : 'center'}} color="secondary" onClick={() => setWorthID(worthID + 1)}>
                  Ready?
                </Button>
              ) : null}
   

        {gameLost ? gameLostMessage() : continueGame()}

      </div>

      <Ladder worthID={worthID} worths={worths} />

    </div>
  );

}
