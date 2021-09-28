import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  TextareaAutosize,
  FormGroup,
  Checkbox,
  Grid,
} from "@material-ui/core";
// import Checkbox from '@mui/material/Checkbox';
import "../styles/CreateQ.css";
import axios from "axios";

function CreateQuestion() {

  const [maxQID, setMaxQID] = useState(0); 

  useEffect(() => {

    fetch("http://localhost:8000/api/list-q/")
      .then((response) => response.json())
      .then((data) => {
        let arr = data, mx = 0;
        for(let i=0; i<arr.length; i++) {
          console.log(arr[i].id);
          mx = Math.max(mx, arr[i].id);
        }
        setMaxQID(mx);
        console.log(maxQID);
      });

  }, [maxQID])

  function handleSubmit(event) {
    // event.preventDefault();

    const worth = event.target.elements.worth.value;
    const title = event.target.elements.title.value;
    const trivia = event.target.elements.trivia.value;
    const hint = event.target.elements.hint.value;

    const qid = maxQID + 1;
    const boolstr = event.target.elements.correctCheck.value;
    let isCorrect = false;
    if(boolstr === "true") {
        isCorrect = true;
    }

    axios.all([
   
      axios.post("http://localhost:8000/api/create-q/", {
        worth: worth,
        title: title,
        trivia: trivia,
        hint: hint,
      }),
      axios.post("http://localhost:8000/api/create-c/", {
         question : qid,
         choice : event.target.elements.choiceName.value,
         position : event.target.elements.position.value,
         is_correct : isCorrect,
      })
    ])
    .then(axios.spread((data1, data2) => {
      // output of req.
      console.log('data1', data1, 'data2', data2)
    }));

    // axios
    //   .post("http://localhost:8000/api/create-c/", {
    //     worth: worth,
    //     title: title,
    //     trivia: trivia,
    //     hint: hint,
    //   })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));

    alert("question created successfully");
  }

  return (
    <div className="question-creation-form">
      <main>
        <form onSubmitCapture={(event) => handleSubmit(event)}>
          <FormGroup style={{ margin: "10px" }}>

          <div>Worth (1 for ₹1000, 2 for ₹2000, 15 for ₹1 crore and so on) </div>

            <TextField
              className="fields"
              required
              id="filled-required"
              label="Worth ID"
              variant="filled"
              name="worth"
            />

            <div>Question</div>

            <TextField
              required
              id="filled-required"
              label="Title/question"
              defaultValue=""
              variant="filled"
              name="title"
              placeholder="Title"
            />

            <div> Option1 </div>

        <FormGroup>
               <TextField
                className = "fields"
                required
                id="filled-required"
                label="Choice"
                variant="filled"
                name="choice1"
                />

                <Checkbox
                className = "fields"
                required
                checked = "false"
                name = "isCorrect1"
                />

        </FormGroup>

           <div> Trivia </div>
            <TextField
              className="fields"
              required
              id="filled-required"
              label="Trivia"
              defaultValue=""
              variant="filled"
              name="trivia"
            />
            
            <div> Hint </div>
            <TextField
              required
              id="filled-required"
              label="Hint"
              defaultValue=""
              variant="filled"
              name="hint"
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
      </main>
    </div>
  );
}

export default CreateQuestion;
