import React, {useState, useContext} from 'react'
import OptionHandler from './OptionHandler.js';
import {Button} from "@material-ui/core";

import Context from '../store/pause-context.js';

function OptionBox(props) {

  const { timerPaused, setTimerPaused } = useContext(Context);
  const {choice_items, worthID, setWorthID, setRightAnswer, gameLost, setPause} = props;

  const [disableFreeze, setDisableFreeze] = useState(true);
  const [showCAB, setShowCAB] = useState(false);
  const [cabClicked, setCABClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

//   const [buttonProps, setButtonProps] = [{}, {}, {}, {}]

  function optionHandler(clicked) {
    setDisableFreeze(!clicked);
    console.log("disabled-");
 }
 
 function freezeOptions() {
 // also stop the timer.
    setShowCAB(!showCAB);
    // setTimerPaused(true);
    console.log("worthId after freezing-");
    console.log(worthID);
 }

 function checkAnswer() {
    //  console.log("checking answer."); 
     setCABClicked(!cabClicked);

     if(!isCorrect) {

        props.getResult(false);
        // setRightAnswer(false);
     }
     else {
       setShowCAB(!showCAB);
       props.getResult(true);
      //  setRightAnswer(true);
 
     }

 }

 function displayButtons() {

  let mat = [[]], arr = [];
  choice_items.map((option) => {
      arr.push(option);
  })

  mat = [ [arr[0], arr[1]], [arr[2], arr[3]] ];
      
   return (
      <div>        
         {

        mat.map((row, index) => ( 
          <div key={index} className="option-row">
            { row.map( (option) => {
                return (
                        <div key={option.position + index}>
                            <OptionHandler 
                            option={option} 
                            id={option.position} 
                            onOptionClick = {optionHandler}
                            disableOption = {showCAB}
                            cabClicked = {cabClicked}
                            setChosen = {setIsCorrect}
                            worthID = {worthID}
                            /> 
                        </div>
                      )
              } ) 
            }
            </div>
          ))

         } 
     </div>
   )
 }


    return (
        <div id="inner2">
          

            {displayButtons()}
  
    
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
