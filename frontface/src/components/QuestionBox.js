import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

import "../styles/QuestionBox.css";
import OptionHandler from "./OptionHandler.js";

//typeracer
function QuestionBox(props) {
  const { questions, choices, worths, worthID, setWorthID } = props;

  // button states
  // const [bgcolor, setBgcolor] = useState(['black', 'black', 'black', 'black']);
  // const [textcolor, setTextcolor] = useState(['white', 'white', 'white', 'white'])
  // const [buttonClicked, setButtonClicked] = useState([false, false, false, false]);
  const [disabled, setDisabled] = useState(true);

  function optionHandler(clicked) {
        setDisabled(!clicked);
  }

  function startGame() {
    const question_items = questions.filter((question) => {
      return question.worth === worthID;
    });
    const question =
      question_items[Math.floor(Math.random() * question_items.length)];
    console.log(question);
    const choice_items = choices.filter(
      (choice) => choice.question === question.id
    );
    console.log(choice_items);

    return (
      <div className="typeRacer">
        <div className="time">
          <p> Time </p>
        </div>

        <div className="typeRacer">
          <div className="wordOutput">
            <p> Q- {question.title} </p>
          </div>

          {/* set timeout of 7s. */}
          {choice_items.map((option) => {
            return (
              <div key={option.position}>
                {/* {console.log(option.position)} */}
                <OptionHandler 
                option={option} 
                id={option.position} 
                onOptionClick = {optionHandler}
                />
              </div>
            );
          })}

          <div style={{ textAlign: "center", backgroundColor: "white" }}>
            <Button disabled={disabled} color="primary">
              Freeze
            </Button>
            <Button color="primary">Check Answer</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="typeRacer">
      {worthID === 0 ? (
        <Button color="secondary" onClick={() => setWorthID(worthID + 1)}>
          Ready?
        </Button>
      ) : null}

      {worthID === 1 ? startGame() : null}
    </div>
  );
}

export default QuestionBox;

{
  /* <ButtonGroup disableElevation variant="contained" color={optionColors[0]}>
<Button onClick={() => handleOptionClick(choice_items[0].position)} id="one" color="primary">
  A. {choice_items[0].choice}
</Button>
<Button onClick={() => handleOptionClick(choice_items[1].position)} id="two" color="primary">
 B. {choice_items[1].choice}
</Button>
</ButtonGroup>

<ButtonGroup disableElevation variant="contained" color="primary">
<Button onClick={() => handleOptionClick(choice_items[2].position)} id="three" color="primary">
C. {choice_items[2].choice}
</Button>
<Button onClick={() => handleOptionClick(choice_items[3].position)} id="four" color="primary">
 D. {choice_items[3].choice}
</Button>
</ButtonGroup> */
}
