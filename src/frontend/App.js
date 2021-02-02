import React, { useState, useEffect } from 'react';
import logo from './resources/teamo.png'
import ReactDOM from 'react-dom';

import {Container, Grid, Divider, Switch, Typography, ThemeProvider, TextField, Button} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import Profile from './Profile';
import Show from './Show';

import {useSelector} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
import teamReducer from './reducers/teamReducer';
import { LiveTvRounded } from '@material-ui/icons';


function App(){

  const [multi, setMulti] = useState(["mimai", "iventhos"]);
  const [query, setQuery] = useState("");
  const [multiSub, setMultiSub] = useState(false);

  const lighttheme = createMuiTheme({
    palette: {
        primary: {
          main: "#6200EE",
        },
        secondary: {
          main: "#03DAC6",
        },
        background: {
          default: "#e6e7eb",
        },
        type: 'light',
      },
      overrides: {
        MuiPaper: {
          rounded: {
            backgroundColor:"#edeef2",
          }
        }
      }
      
  });

  const handleChange = (event) => {
    setQuery(event.target.value);
    event.preventDefault();
  }

  const handleSubmit = (event) => {
    setMulti(query.split(', '))
    console.log(multi)
    setMultiSub(true);
    event.preventDefault();

    
  }

  const darktheme = createMuiTheme({
      palette: {
          type: 'dark',
          neutral: {
            main: '#5c6ac4',
          },
          background: {
            default: "#111214",
          },
        },
        overrides: {
          MuiPaper: {
            rounded: {
              backgroundColor:"#1d2126",
            }
          }
        }
    });
  
  const [night, setNight] = React.useState(false);
  const [theme, setTheme] = React.useState(lighttheme);
   
   const [showScores, setShowScores] = React.useState(false);
   const onClick = () => setShowScores(!showScores);
   const changeNight = () => {
     setNight(!night);
     if(night) {
       setTheme(lighttheme);
     }
     else {
       setTheme(darktheme)
     }
   }

    return (
      <div className="App">
        <ThemeProvider theme={theme}>
        <CssBaseline />
        
        
        <Container maxWidth="md"> 
          <Grid container item xs={12} justify="center">
            <img src={logo}></img>
            <Switch onChange={changeNight}/>
          </Grid>
          {!multiSub ? 
            <form className="multisearch" onSubmit={handleSubmit}>
              <TextField id="standard-basic" label="Multi Search" onChange={handleChange} fullWidth="true" defaultValue={query}/>
              <Button type="submit">Submit</Button>
            </form>
            : <br/>
          } 

          
          
          
          {multiSub ? 
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Profile player={multi[0]}/>
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <Profile player={multi[1]}/>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Profile player={multi[2]}/>
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <Profile player={multi[3]}/>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Profile player={multi[4]}/>
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <Profile player={multi[5]}/>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Profile player={multi[6]}/>
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <Profile player={multi[7]}/>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Profile player={multi[8]}/>
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <Profile player={multi[9]}/>
            </Grid>
          </Grid>
          :
          <br></br>
        }
         
        

        </Container>
        
        <Show theme={night}/>
        </ThemeProvider>
      </div>
    );
  
  
};

export default App;
