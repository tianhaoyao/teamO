import React from 'react';
import logo from './teamo.png'
import ReactDOM from 'react-dom';

import {Container, Grid, Divider, Button} from '@material-ui/core'

import Profile from './Profile';
import Sort from './Sort';

import {useSelector} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
import { findAllByDisplayValue } from '@testing-library/react';

function App(){
  

 
   const scores = useSelector(state => state.scoreReducer);
   
    return (
      <div className="App">
        <Container maxWidth="md"> 
          
          <img src={logo}></img>

          <p>SCORES {scores}</p>

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

           
            <Sort></Sort>

  
        </Grid>
        </Container>
        
  
        
  
        
        
      </div>
    );
  
  
};

export default App;
