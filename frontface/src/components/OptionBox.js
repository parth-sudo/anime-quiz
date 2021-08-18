import React, {useState, useEffect} from 'react'
import OptionHandler from './OptionHandler.js';
import {Button} from "@material-ui/core";

function OptionBox(props) {

  const {choice_items, worthID, setWorthID} = props;

  const [disableFreeze, setDisableFreeze] = useState(true);
  const [showCAB, setShowCAB] = useState(false);
  const [cabClicked, setCABClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
//   const [buttonProps, setButtonProps] = [{}, {}, {}, {}]

  function optionHandler(clicked) {
    setDisableFreeze(!clicked);
    console.log("disabled-");
    console.log(disableFreeze);
 }
 
 function freezeOptions() {
 // also stop the timer.
    setShowCAB(!showCAB);
 }

 function checkAnswer() {
     console.log("checking answer."); 
     setCABClicked(!cabClicked);

     if(!isCorrect) {
        console.log("wrong answer.");
        props.getResult(false);
     }
     else {
       setShowCAB(!showCAB);
       props.getResult(true);
       console.log("right answer.");
     }

 }


    return (
        <div className = "typeRacer">
   
                {choice_items.map((option) => {
                return (
                <div key={option.position}>
                    {/* {console.log(option.position)} */}
                    <OptionHandler 
                    option={option} 
                    id={option.position} 
                    onOptionClick = {optionHandler}
                    disableOption = {showCAB}
                    showAnswer = {cabClicked}
                    setChosen = {setIsCorrect}
                    worthID = {worthID}
                    />
                </div>
                );
            })}
    
          <div style={{ textAlign: "center", backgroundColor: "white" }}>
          
            {showCAB ? <Button onClick={checkAnswer}> Check Answer </Button>: 
            <Button disabled={disableFreeze} onClick={freezeOptions} color="primary">
              Freeze
            </Button>}
 
          </div>
            
        </div>
    )
}

export default OptionBox
