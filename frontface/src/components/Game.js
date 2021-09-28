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
import adhbhut from "../soundEffects/adhbhut.mp3";

export default function Game() {
  // get all choices, questions, worth.
  //
  const [worths, setWorths] = useState([]);
  const [choices, setChoices] = useState([]);
  const [questions, setQuestions] = useState([]);
  
  const [worthID, setWorthID] = useState(0);
  const [prevID, setPrevID] = useState(1);

  const [gameLost, setGameLost] = useState(false);

  const [freezed, setFreezed] = useState(false);

  const [choiceItems, setChoiceItems] = useState([]);
  const [question, setQuestion] = useState(null);

  const [rightAnswer, setRightAnswer] = useState(false);
  const [correctChoice, setCorrectChoice] = useState({pos:0, val:'null', trivia: 'null', hint:'null'});
  const [TL, setTL] = useState(4000);


  useEffect(() => {

    console.log("First useEffect");

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
   
      });
  }, []);

  useEffect(() => {
     
    if(worthID > 0 && worthID < 16) {

      console.log("second useEffect running");
   
      const question_items = questions.filter((question) => {
        return question.worth === worthID;
      });
      console.log(question_items);
      const question = question_items[Math.floor(Math.random() * question_items.length)];
      console.log(question);
      const choice_items = choices.filter( 
        (choice) => choice.question === question.id
      );

      const sahiJawab = choice_items.find(c => c.is_correct) || {};
      const obj = {pos : 0, val : 'null', trivia : 'null'};
      obj.pos = sahiJawab.position;
      obj.val = sahiJawab.choice;
      obj.trivia = question.trivia;

      setCorrectChoice(obj);

      // setRightAnswer(obj);
      setQuestion(question);

        let x = 60/130;
        var arr = question.title.split(' ');
        let n = arr.length;
        let y = n*x*1000;
        // console.log(n);
        setTL(y);
    
      // console.log(question);
      setChoiceItems(choice_items);
      // console.log(rightAnswer);
    

    }
  }, [worthID, questions, choices])


  function boxHolder() {
    console.log("boxHolder rendering");
    // console.log(question);
 
    if(question !== null) {
      return (
        <Container>
          <Context.Provider value = {{freezed, setFreezed}}>
          <div id="wrapper">
            <QuestionBox worthID={worthID} 
            setWorthID={setWorthID}
            question={question}
            timeUpCheck = {timeUpCheck}
            worths = {worths}
            TL = {TL}
            />
  
            <OptionBox choice_items={choiceItems} 
            // setRightAnswer = {setRightAnswer}
            worthID = {worthID} 
            setWorthID={setWorthID}
            getResult = {getResult}
            TL = {TL}
            />
           </div>
          </Context.Provider>
        </Container>
      )

    }

  }

  // prop function.
function timeUpCheck(s) {
    if(s === 0) {
       setGameLost(true);
    }
}
    // prop function.
  function getResult(isCorrect) {
    if(isCorrect) {
      // console.log(" func get result says absolutely true");
      if(worthID === 15) {
        let won = new Audio(adhbhut);
        won.play();
      }
      setWorthID(worthID + 1);
      console.log(worthID);
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
 
 const amountWonOnLosing = () => {
  let i = worthID;
  console.log(i);
  if(i >= 5 && i < 10) {
    return worths[4].cost;
  }
  else if(i >= 10 && i < 15) {
    return worths[9].cost;
  }
  return 0; 
}

  function putNextQuestion() {
 
    // console.log(question.trivia)
    return (
      <div className ="pauseScreen">
       <h3 style={{color: 'white'}} onClick={() => setRightAnswer(true)}> Right answer!  <Button color="secondary"> Next </Button></h3>
     </div> 
   )
  }

  const gameLostMessage = () => {
    console.log(correctChoice);
      return (
        <div className="pauseScreen"> 
  
          <h2> Wrong! The correct answer is <span style={{color:'lightgreen'}}> {alphabet(correctChoice.pos)} {correctChoice.val} </span> </h2>
          <h2> Trivia </h2>
          <p> {question.trivia} </p>
          <h3> You take away ₹{amountWonOnLosing()} </h3>
          <Button color="secondary" to = "/" component={Link}> Back to Home </Button>
        </div>
      )
      
   }

   const gameWonMessage = () => {
    //  let won = new Audio(adhbhut);
    //  won.play();
    return (
      <div className = "pauseScreen">  
         <h1 > <span style={{color: "lightgreen"}}>Congratulations!!</span> You have completed the game 
            and you have also won a cash prize of <span style={{color : 'orange'}}>₹1 crore!</span></h1>
          <h2> Trivia </h2>
          <p> {question.trivia} </p>
          <h3> You take away <span style={{color : 'cyan'}}> ₹1 crore!</span> </h3>
      </div>
    )
  }

  const resetStates = () => {
        if(rightAnswer) {
          setRightAnswer(false);
          setPrevID(worthID);
          setFreezed(false);
        }
  }

  function continueGame() {
    return (
      <div>

        {worthID === 1 ? boxHolder() : null}
        {prevID < worthID && worthID < 16 ? putNextQuestion() : null}
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
              <div className="pauseScreen"> 
                <Button style={{margin: '0 auto'}} color="secondary" onClick={() => setWorthID(worthID + 1)}>
                  Begin!!!
                </Button>
                </div>
              ) : worthID > 15 ? gameWonMessage() : null}
   
    

        {gameLost ? gameLostMessage() : continueGame()}
    
      </div>

      <Ladder worthID={worthID} worths={worths} />

    </div>
  );

}
