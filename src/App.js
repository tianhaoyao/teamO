import React from 'react';
import logo from './teamo.png'
import ReactDOM from 'react-dom';

import {Container, Grid, Divider} from '@material-ui/core'

import Profile from './Profile';

import {useSelector} from 'react-redux';

function App(){
  

 
  const scores = useSelector(state => state.scoreReducer[1]);
    return (
      <div className="App">
        <Container maxWidth="md"> 
          
          <img src={logo}></img>

          <p>{scores}</p>

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
          
  
        </Grid>
        </Container>
        
  
        
  
        
        
      </div>
    );
  
  
};

export default App;
