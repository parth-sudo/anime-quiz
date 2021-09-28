import React, {useState, useEffect} from 'react'
import { Button, TextField, TextareaAutosize, FormGroup, Checkbox } from "@material-ui/core";
import axios from "axios";
import "../styles/CreateQ.css";

function CreateOption() {

const [maxQID, setMaxQID] = useState(0); 

//   useEffect(() => {

//     fetch("http://localhost:8000/api/list-q/")
//       .then((response) => response.json())
//       .then((data) => {
//         let arr = data, mx = 0;
//         for(let i=0; i<arr.length; i++) {
//           mx = Math.max(mx, arr[i].id);
//         }
//         setMaxQID(mx);
//         console.log(maxQID);
//       });

//   }, [maxQID])

  function maxQuestionID() {
    if(maxQID > 0) {
        return maxQID;
    }
    return 0;
  }

const handleSubmit = (event) => {

    event.preventDefault();

    const boolstr = event.target.elements.correctCheck.value;
    let isCorrect = false;
    let qid = maxQID;
    if(boolstr === "true") {
        isCorrect = true;
    }

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({     
    //         question : qid,
    //         choice : event.target.elements.choiceName.value,
    //         position : event.target.elements.position.value,
    //         is_correct : isCorrect 
    //     })
    // };
    // fetch('http://127.0.0.1:8000/api/create-c/', requestOptions)
    //     .then(response => response.json())
    //     .then(data => console.log(data));


    console.log(qid);
    axios.post("http://localhost:8000/api/create-c/", {
                question : event.target.elements.questionID.value,
                choice : event.target.elements.choiceName.value,
                position : event.target.elements.position.value,
                is_correct : isCorrect,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    }

    return (
        <div className="question-creation-form">
            <form onSubmitCapture = {((event) => handleSubmit(event))}> 
            <FormGroup> 

            <TextField
                className = "fields"
                required
                id="filled-required"
                label="QID"
                defaultValue = {maxQuestionID()}
                hidden = {true}
                variant="filled"
                type = "number"
                name="questionID"
                />
               
                <TextField
                className = "fields"
                required
                id="filled-required"
                label="Choice"
                variant="filled"
                name="choiceName"
                />

                <TextField
                className = "fields"
                required
                id="filled-required"
                label="Position"
                variant="filled"
                type = "number"
                name="position"
                />

                <TextField
                className = "fields"
                required
                id="filled-required"
                label="Correct?"
                defaultValue = "false"
                variant="filled"
                name="correctCheck"
                />
            
            <Button
              variant="contained"
              color="primary"
              label="Submit"
              type="submit"
            >
              Submit
            </Button>
         </FormGroup>
    
            </form>
        </div>
    )
}

export default CreateOption
