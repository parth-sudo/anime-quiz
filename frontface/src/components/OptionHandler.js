import React, {useState, useEffect} from 'react'
import '../styles/QuestionBox.css';
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

export default function OptionHandler(props) {
    const {option, id, disableOption, setChosen, worthID} = props;
   
    const [clicked, setClicked] = useState(true);
    const [bgcolor, setBgcolor] = useState('black');
    const [textcolor, setTextcolor] = useState('white');
    const [prevWorthID, setPrevWorthID] = useState(0);


  function handleOptionClick() {

      setClicked(!clicked);
      if(clicked) {
          setChosen(option.is_correct);
          setBgcolor('yellow');
          setTextcolor('black');
      }
      else {
          if(disableOption === false) {
            setChosen(false);
            setBgcolor('black');
            setTextcolor('white');
          }

      }
    // console.log(clicked);

      props.onOptionClick(clicked);
 
  }

  function resetOptions() {
      if(worthID > prevWorthID) {
          setBgcolor('black');
          setTextcolor('white');
          setClicked(true);
          setPrevWorthID(worthID);
      }
  }


  let style = {backgroundColor : bgcolor, color : textcolor};

    return (
        <div>
            <button disabled={disableOption && bgcolor!=='yellow'} onClick={handleOptionClick}
            style={style} 
            className={`option${id}`}> {option.choice} </button>
            {resetOptions()}

        </div>
    )
}
