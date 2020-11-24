import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Typography} from '@material-ui/core'

import {useSelector} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
import teamReducer from './reducers/teamReducer';
import teamTotal from './reducers/teamTotal';

function TotalScore(){
  

 
   const teamScoresArray = useSelector(state => state.teamTotal);
   

    return (
      <div>
        <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary" component="p">
                  Score: {teamScoresArray[0]}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                
                <Typography variant="body2" color="textSecondary" component="p">
                  Score: {teamScoresArray[1]}
                </Typography>
                
              </Grid>
            </Grid>
      </div>
    );
  
  
};

export default TotalScore;
