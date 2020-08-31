import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import {update} from './actions';
import {Container, Grid, Divider, Button} from '@material-ui/core'

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';
function Sort() {
    const scoresArray = useSelector(state => state.scoreReducer);
    let sortedArray = [];
    let team1 = ['-', '-', '-', '-', '-'];
    let team2 = ['-', '-', '-', '-', '-'];
    let teamScore = [0, 0];



    // players are structured [ (str) summonername, (int) scorerating, (str) preferred position ]
    // teams are structured [ top, jg, mid, adc, supp ]
    
    function compare(p1, p2) {
        if(p1[1] < p2[1]) {
            return 1;
        }
        if(p1[1] > p2[1]) {
            return -1;
        }
        return 0;
    }

    function lookupPosition(pos) {
        switch(pos) {
            case 'TOP':
                return 0;
            case 'JUNGLE':
                return 1;
            case 'MID':
                return 2;
            case 'BOTTOM':
                return 3;
            case 'SUPPORT':
                return 4;
            default:
                return -1;
        }
    }

    function calculateTeamScore(team) {
        let s = 0;
        for(let i = 0; i < team.length; i++) {
            if(team[i] != '-') {
                s += team[i][1];
                if(lookupPosition(team[i][2]) == i) {
                    s += 100;
            }
            }
            
        }
        console.log("calculated score:" + s + "for team" + team);
        return s;
    }

    function calculateDiff() {
        return Math.abs(calculateTeamScore(team1) - calculateTeamScore(team2));
    }

    function swap(pos) {
        console.log("SWAPPING")
        let temp = team1[pos];
        team1[pos] = team2[pos];
        team2[pos] = temp;
        console.log("SWAPPED", team1, team2)
    }

    function adjust() {
        let currDiff = calculateDiff();
        for(let i = 0; i < team1.length; i++) {
            if (!(team1[i] == "-" && team2[i] == "-")){
                console.log("current team diff: " + calculateDiff() + ", swapping pos" + i);
                swap(i);
                if(calculateDiff() >= currDiff) {
                    console.log("swapping back because worse team diff: " + calculateDiff() + "vs" + currDiff);
                    swap(i);
                }
                else {
                    currDiff = calculateDiff();
                    console.log("swapping because better team diff: " + calculateDiff());
                }
                teamScore[0] = calculateTeamScore(team1);
                
                teamScore[1] = calculateTeamScore(team2);
                console.log(teamScore);
            }
            else{
                console.log("blank", team1[i], team2[i], i)
                console.log(!(team1[i] == "-" && team2[i] == "-"))
            }
            
            
        }
        
    }

    function getRemainingSpots(team) {
        let slots = []
        for (let i = 0; i < team.length; i++) {
            if(team[i] == "-") {
                slots.push(i);
            }
        }
        return slots;
    }

    function sortTeam() {
        

        
        sortedArray = scoresArray.sort(compare);
        console.log("sorted:" + sortedArray);
        let slots1 = [];
        let slots2 = [];

        for(let i = 0; i < sortedArray.length; i++) {
            if(team1[lookupPosition(sortedArray[i][2])] == '-') {
                team1[lookupPosition(sortedArray[i][2])] = sortedArray[i];
                
                console.log(sortedArray[i][0] + "filled team 1 by rank");
            }
            else if(team2[lookupPosition(sortedArray[i][2])] == '-') {
                team2[lookupPosition(sortedArray[i][2])] = sortedArray[i];
                
                console.log(sortedArray[i][0] + "filled team 2 by rank");
            }
            else {
                // find empty spots, randomly seed
                slots1 = getRemainingSpots(team1);
                slots2 = getRemainingSpots(team2);


                if(slots1.length > slots2.length) {
                    console.log("emptyspots1:", slots1, "emptySpot2", slots2, "choosing put in 1");
                    // [1,3,4] (jg adc supp)
                    let spot = Math.floor(Math.random() * slots1.length);
                    // spot = 1
                    let randomPosition = slots1[spot];
                    // randomPosition = 3 (adc)
                    team1[randomPosition] = sortedArray[i];
                    console.log(sortedArray[i][0] + "filled team 1 by overflow in position" + randomPosition + ', here is empty spots left:' + slots1);
                }
                else if(slots1.length <= slots2.length) {
                    console.log("emptyspots1:", slots1, "emptySpot2", slots2, "choosing put in 2");
                    // [1,3,4] (jg adc supp)
                    let spot = Math.floor(Math.random() * slots2.length);
                    // spot = 1
                    let randomPosition = slots2[spot];
                    // randomPosition = 3 (adc)
                    team2[randomPosition] = sortedArray[i];
                    console.log(sortedArray[i][0] + "filled team 2 by overflow in position" + randomPosition + ', here is empty spots left:' + slots2);
                }
                else{
                    console.log("too many players?");
                }
                

                


            }
        }

        adjust();
    }

    function displayTeam(team) {
        let t = ''
        if(team != null) {
            for(let i = 0; i < team.length; i++) {
                t += (team[i][0] + ' ' + team[i][1] + ' ' + team[i][2] + '\n');
            }
        }
        
        return t;
    }

    return(
        <div>
            <p>SCORES {scoresArray}</p>
            <Typography variant="body2" color="textSecondary" component="p">Team1: {team1} Team2: {team2}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">TeamScore: {teamScore}</Typography>
            <Button onclick={sortTeam()}>DONE</Button>

            
        </div>
    );
}
export default Sort;