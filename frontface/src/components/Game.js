import React, { useState, useEffect } from "react";
import Container from "./Container";
import QuestionBox from "./QuestionBox";
import Ladder from "./Ladder.js";
import "../styles/Game.css";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

export default function Game() {
  // get all choices, questions, worth.
  //
  const [worths, setWorths] = useState([]);
  const [choices, setChoices] = useState([]);
  const [questions, setQuestions] = useState([]);

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

  const [worthID, setWorthID] = useState(0);

//   function gameHandler() {
//     if(worthID === 0) {
//       <Typography>
//         Start A new Game.
//       </Typography>
//     }
//   }

  return (
    <div className="game">
      <Container>
        <QuestionBox worthID={worthID} 
                     setWorthID={setWorthID}
                      worths={worths} 
                     choices={choices}
                     questions={questions} />
      </Container>
      <Ladder worthID={worthID} worths={worths} />
    </div>
  );
}
