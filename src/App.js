import React from 'react';
import logo from './teamo.png'
import ReactDOM from 'react-dom';

import {Container, Grid, Divider, Button, Card, Typography} from '@material-ui/core'

import Profile from './Profile';
import Sort from './Sort';
import Results from './Results';
import TotalScore from './TotalScore';
import Show from './Show';

import {useSelector} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
import teamReducer from './reducers/teamReducer';

import { findAllByDisplayValue } from '@testing-library/react';


function App(){
  

 
   //const scores = useSelector(state => state.scoreReducer);
   
   
   const [showScores, setShowScores] = React.useState(false);
   const onClick = () => setShowScores(!showScores);

    return (
      <div className="App">
        
        <Container maxWidth="md"> 
          
          <img src={logo}></img>

          <Divider />
          <Grid container spacing={3}>
          
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Profile/>
          </Grid>

          <Grid item xs={12} sm={12}>
          
          </Grid>
         
        </Grid>

        

        

        </Container>
        

        
        <Show/>
        {/* <Container maxWidth="md"> 
          {showScores ? 
          <Button onClick={onClick}>Back</Button> 
          : 
          <Button onClick={onClick}>Show me the teams!</Button>}
          
        </Container> */}
        
        
      </div>
    );
  
  
};

export default App;
