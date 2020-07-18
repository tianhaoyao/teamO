import React from 'react';
import logo from './teamo.png'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Profile from './Profile';

class App extends React.Component {
  getScore() {
    alert("yo");
  }
  render(){
    return (
      <div className="App">
        <Container maxWidth="md"> 
          
          <img src={logo}></img>
          <Grid container spacing={3}>
          
          <Grid item xs={12} sm={6}>
            <Profile getScore={this.getScore}/>
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
  }
  
}

export default App;
