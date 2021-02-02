import React from 'react';
import ReactDOM from 'react-dom';

import {Container, Grid} from '@material-ui/core'

import Sort from './Sort';
import Results from './Results';
import TotalScore from './TotalScore';

import {useSelector} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
import teamReducer from './reducers/teamReducer';
import { PinDropSharp } from '@material-ui/icons';



function Show(props){
    return (
      <div className="Show">
        <Container maxWidth="md">
        
           <Sort></Sort>

           <Grid container spacing={3}>

             
           
             <Grid item xs={12} sm={6}>
               <Results
                 team="0"
                 pos="0"
                 theme={props.theme}
               />
             </Grid>

             <Grid item xs={12} sm={6}>
               <Results
                 team="1"
                 pos="0"
                 theme={props.theme}
               />
             </Grid>

             <Grid item xs={12} sm={6}>
               <Results
                 team="0"
                 pos="1"
                 theme={props.theme}
               />
             </Grid>

             <Grid item xs={12} sm={6}>
               <Results
                 team="1"
                 pos="1"
                 theme={props.theme}
               />
             </Grid>


             <Grid item xs={12} sm={6}>
               <Results
                 team="0"
                 pos="2"
                 theme={props.theme}
               />
             </Grid>

             <Grid item xs={12} sm={6}>
               <Results
                 team="1"
                 pos="2"
                 theme={props.theme}
               />
             </Grid>

             <Grid item xs={12} sm={6}>
               <Results
                 team="0"
                 pos="3"
                 theme={props.theme}
               />
             </Grid>

             <Grid item xs={12} sm={6}>
               <Results
                 team="1"
                 pos="3"
                 theme={props.theme}
               />
             </Grid>

             <Grid item xs={12} sm={6}>
               <Results
                 team="0"
                 pos="4"
                 theme={props.theme}
               />
             </Grid>

             <Grid item xs={12} sm={6}>
               <Results
                 team="1"
                 pos="4"
                 theme={props.theme}
               />
             </Grid>

           </Grid>

           <TotalScore/>

       </Container>
        
      </div>
    );
  
  
};

export default Show;
