import React from 'react'
import { Grid, Typography, Button } from "@material-ui/core";
import Game from './Game';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function Home() {
  
    const renderHome = () => {
        console.log('Hi')
        return(
           <Grid item xs={12} align="center">
              <Typography variant="h3" compact="h3">
              <p style={{'color': 'white'}}> This is the home page. </p>
                <Button color="primary" to = "/game" component={Link}> 
               Click here to play
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
          
        </Switch>
      </Router>
    )
}