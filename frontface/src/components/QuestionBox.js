import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

import "../styles/QuestionBox.css";
import OptionHandler from "./OptionHandler.js";

//typeracer
function QuestionBox(props) {
  const { question, worthID, setWorthID } = props;

  function startGame() {

    return (
      <div className="typeRacer">
        <div className="time">
          <p> Time </p>
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
