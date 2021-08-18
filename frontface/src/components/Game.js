import React, { useState, useEffect } from "react";
import Container from "./Container";
import QuestionBox from "./QuestionBox";
import Ladder from "./Ladder.js";
import OptionBox from "./OptionBox.js";
import "../styles/Game.css";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

export default function Game() {
  // get all choices, questions, worth.
  //
  const [worths, setWorths] = useState([]);
  const [choices, setChoices] = useState([]);
  const [questions, setQuestions] = useState([]);
  
  const [worthID, setWorthID] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(false);
  const [gameLost, setGameLost] = useState(false);

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
    const question_items = questions.filter((question) => {
      return question.worth === worthID;
    });
    const question = question_items[Math.floor(Math.random() * question_items.length)];
    console.log(question);
    const choice_items = choices.filter( 
      (choice) => choice.question === question.id
    );
    console.log(choice_items);


    return (
      <Container>

        <QuestionBox worthID={worthID} 
        setWorthID={setWorthID}
        question={question}
         />

        <OptionBox choice_items={choice_items} 
        worthID = {worthID} 
        setWorthID={setWorthID}
        getResult = {getResult}
        />

      </Container>
    )
  }

  function putNextQuestion() {
    console.log(worthID);
    //  setWorthID(worthID + 1);
     setRightAnswer(false);
      return (
        <div className="container">
          {boxHolder()}
        </div>
      )
  }

  function getResult(isCorrect) {
    if(isCorrect) {
      console.log("absolutely true");
      setRightAnswer(true);
      setWorthID(worthID + 1);
    }
    else {
      setGameLost(true);
    }

  }

  const handleCorrectAnswer = () => {
    console.log("handle correct answer fucntion");
    console.log(rightAnswer);
    return (
      <div> 
        <Button onClick={putNextQuestion}> Correct Answer! Next</Button>
      </div>
    )
  }

 
  return (
    <div className="game">

      {rightAnswer ? handleCorrectAnswer() : null}
      {/* {gameLost ? : } */}

      <div className="container"> 
        {worthID === 0 ? (
          <Button color="secondary" onClick={() => setWorthID(worthID + 1)}>
            Ready?
          </Button>
        ) : null}
   
      {worthID > 0 ? boxHolder() : null}
      </div>
      <Ladder worthID={worthID} worths={worths} />

    </div>
  );

}
