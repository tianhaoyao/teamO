import React from 'react';
import logo from './teamo.png'
import ReactDOM from 'react-dom';

import {Container, Grid, Divider, Button, Card, Typography, CardActionArea, CardContent} from '@material-ui/core'

import Profile from './Profile';
import Sort from './Sort';

import {useSelector} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
import teamReducer from './reducers/teamReducer';
import { findAllByDisplayValue } from '@testing-library/react';

function Results(props){
  

 
   //const scores = useSelector(state => state.scoreReducer);
   const teams = useSelector(state => state.teamReducer);
   let show = false;
   let color;
   if(props.team == "1") {
      if((typeof teams[props.team] != "undefined" && teams[props.team][props.pos] != "-")) {
        color = "#FF6699";
      }
      else {
        color = "#ff96ad";
      }
   }
   else {
    if((typeof teams[props.team] != "undefined" && teams[props.team][props.pos] != "-")) {
      color = "#66B3FF"
    }
    else {
      color = "#9ecfff";
    }
   }  

    return (
      <div>
        <Card className="profile" style={{backgroundColor: color}}>
          <CardActionArea>
            <CardContent>
              
              <div>
                <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={3}>
                    
                  </Grid>
                  <Grid item xs={12} sm={7}>
                  {(typeof teams[props.team] != "undefined" && teams[props.team][props.pos] != "-") ? 
                    
                    
                      
                      <Typography gutterBottom variant="h5" component="h2">
                        {teams[props.team][props.pos][0]}
                      </Typography>
                        
                      
                    :
                    
                      <Typography gutterBottom variant="h5" component="h2">
                        N/A
                      </Typography>
                    }
                  <div>
                  </div>

                  </Grid>
 
                </Grid>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  
  
};

export default Results;
