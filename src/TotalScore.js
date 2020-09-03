import React from 'react';
import logo from './teamo.png'
import ReactDOM from 'react-dom';

import {Container, Grid, Divider, Button, Card, Typography, CardActionArea, CardContent} from '@material-ui/core'

import Profile from './Profile';
import Sort from './Sort';

import {useSelector} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
import teamReducer from './reducers/teamReducer';
import teamTotal from './reducers/teamTotal';
import { findAllByDisplayValue } from '@testing-library/react';

function TotalScore(){
  

 
   const teamScoresArray = useSelector(state => state.teamTotal);
   

    return (
      <div>
        <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6}>
                <Typography gutterBottom variant="h5" component="h2">
                  Score: {teamScoresArray[0]}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                
                <Typography gutterBottom variant="h5" component="h2">
                  Score: {teamScoresArray[1]}
                </Typography>
                
              </Grid>
            </Grid>
      </div>
    );
  
  
};

export default TotalScore;
