import React, {useState} from 'react'
import '../styles/QuestionBox.css';
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

export default function OptionHandler(props) {
    const {option, id} = props;
   
    // const [optionColors, setOptionColors] = useState(['black', 'black', 'black', 'black']);
    const [clicked, setClicked] = useState(false);
    const [bgcolor, setBgcolor] = useState('black');
    const [textcolor, setTextcolor] = useState('white');

  function handleOptionClick() {

      setClicked(!clicked);
      if(clicked) {
          console.log('clicked');
          setBgcolor('yellow');
          setTextcolor('black');
      }
      else {
        console.log('un clicked');
        setBgcolor('black');
        setTextcolor('white');
      }

      props.onOptionClick(clicked);
  }

  console.log('hi');

  let style = {backgroundColor : bgcolor, color : textcolor};
  console.log(style);
    return (
        <div>
            <button onClick={handleOptionClick}
            style={style} 
            className={`option${id}`}> {option.choice} </button>
        </div>
    )
}
