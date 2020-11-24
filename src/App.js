import React from 'react';
import logo from './teamo.png'
import ReactDOM from 'react-dom';

import {Container, Grid, Divider} from '@material-ui/core'

import Profile from './Profile';
import Show from './Show';

import {useSelector} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
import teamReducer from './reducers/teamReducer';


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
        
      </div>
    );
  
  
};

export default App;
