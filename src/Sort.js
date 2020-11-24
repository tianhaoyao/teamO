import React, { useState, useEffect } from 'react';
import {update, updateTeam, updateTotal} from './actions';

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import scoreReducer from './reducers/scoreCollection';

function Sort() {
    const dispatch = useDispatch();

    const scoresArray = useSelector(state => state.scoreReducer);
    
    let sortedArray = [];
    let team = [['-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-']];
    let extras = [];
    let extraSlots = [];
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
            if(team[i] !== '-') {
                s += team[i][1];
                if(lookupPosition(team[i][2]) === i) {
                    s += 100;
            }
            }
            
        }
        return s;
    }

    function calculateDiff() {
        return Math.abs(calculateTeamScore(team[0]) - calculateTeamScore(team[1]));
    }

    function swap(pos) {

        let temp = team[0][pos];
        team[0][pos] = team[1][pos];
        team[1][pos] = temp;
    }

    function adjust() {
        let currDiff = calculateDiff();
        for(let i = 0; i < team[0].length; i++) {
            if (!(team[0][i] === "-" && team[1][i] === "-")){

                swap(i);
                if(calculateDiff() >= currDiff) {
                    swap(i);
                }
                else {
                    currDiff = calculateDiff();
                }
                teamScore[0] = calculateTeamScore(team[0]);
                
                teamScore[1] = calculateTeamScore(team[1]);
            }
            
        }
        
    }

    function getRemainingSpots(team) {
        let slots = []
        for (let i = 0; i < team.length; i++) {
            if(team[i] === "-") {
                slots.push(i);
            }
        }
        return slots;
    }

    function getRemainingSpotsForBoth() {
        let slots = [[],[]]
        for (let i = 0; i < team[0].length; i++) {
            if(team[0][i] === "-") {
                slots[0].push(i);
            }
        }
        for (let i = 0; i < team[1].length; i++) {
            if(team[1][i] === "-") {
                slots[1].push(i);
            }
        }
        return slots;
    }

    function sortTeam() {
        

        
        sortedArray = scoresArray.sort(compare);
        let slots1 = [];
        let slots2 = [];
        

        for(let i = 0; i < sortedArray.length; i++) {
            if(team[0][lookupPosition(sortedArray[i][2])] === '-') {
                team[0][lookupPosition(sortedArray[i][2])] = sortedArray[i];
            }
            else if(team[1][lookupPosition(sortedArray[i][2])] === '-') {
                team[1][lookupPosition(sortedArray[i][2])] = sortedArray[i];
            }
            else {
                extras.push(sortedArray[i]);
            }

            extraSlots = getRemainingSpotsForBoth();

        }

        

        for(let i = 0; i < extras.length; i++) {
            slots1 = getRemainingSpots(team[0]);
            slots2 = getRemainingSpots(team[1]);


            // FILL BY SECONDARY

            if(team[0][lookupPosition(extras[i][3])] === '-') {
                team[0][lookupPosition(extras[i][3])] = extras[i];
            }
            else if(team[1][lookupPosition(extras[i][3])] === '-') {
                team[1][lookupPosition(extras[i][3])] = extras[i];
            }

            // FILL BY RANDOM

            else{
                if(slots1.length > slots2.length) {
                    let spot = Math.floor(Math.random() * slots1.length);
                    let randomPosition = slots1[spot];
                    team[0][randomPosition] = extras[i];
                }
                else if(slots1.length <= slots2.length) {
                    let spot = Math.floor(Math.random() * slots2.length);
                    let randomPosition = slots2[spot];
                    team[1][randomPosition] = extras[i];
                }
            }

        }

        adjust();
        dispatch(updateTeam(team));
        dispatch(updateTotal(teamScore));

    }

    

    return(
        <div>
            {sortTeam()}
        </div>
    );
}
export default Sort;