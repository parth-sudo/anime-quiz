import React from 'react'
import { Grid, Typography, Button } from "@material-ui/core";
import Game from './Game';
import CreateQuestion from './CreateQuestion.js';
import CreateOption from './CreateOption.js';
import "../styles/Game.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


export default function Home() {
  
const renderHome = () => {
    console.log('Hi')
    return(
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
          <p style={{'color': 'white'}}> Nihon e youkoso! (Welcome!) </p>
            <Button color="primary" to = "/game" component={Link}> 
            Click here to play
          </Button>

          <Button color="secondary" to = "/create" component={Link}> 
            Create questions
          </Button>
          </Typography>
      </Grid>
    )
}

    return (
        <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {renderHome()}}
          >
            {renderHome()}
        
          </Route>
          <Route path="/game" component={Game} />
          <Route path = "/create" component={CreateOption} />
        </Switch>
      </Router>
    )
}
