import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core'

import { updatePlayer } from '../actions';
import { useDispatch } from 'react-redux';
import * as rankData from './settings/ranks.json';
import * as easteregg from './settings/easteregg.json';
import StatsGraph from './StatsGraph';

function Score(props) {

    const dispatch = useDispatch();

    const [score, setScore] = useState(0);
    const [descriptor, setDescriptor] = useState("");
    const [name, setName] = useState("");
    const [pref, setPref] = useState("");
    const [pref2, setPref2] = useState("");
    const [stat, setStat] = useState([]);

    useEffect(() => {
        calculate();
    }, []);




    function calculate() {
        let name = props.name;
        
        let baseScore = rankData.rankScore[props.tier][props.division];
        let lpScore = props.lp * rankData.lpMultiplier[props.tier];

        if(props.tier === "MASTER" || props.tier === "GRANDMASTER" || props.tier === "CHALLENGER") {
            lpScore = Math.pow(lpScore, 1.07);
        }
        let stats = bonus();
        let bonusScore = stats[0];
        let descriptor = stats[1];
        let stat = stats[2];
        let finalScore = Math.round(baseScore + lpScore + bonusScore);
        let pref = props.pref;
        let pref2 = props.pref2;

        setName(name);
        setScore(finalScore);
        setPref(pref);
        setPref2(pref2);
        setDescriptor(descriptor);
        setStat(stat);

        dispatch(updatePlayer(name, finalScore, pref, pref2, props.tier, props.division, descriptor, stat));

        return finalScore;



    }

    function getKDABonus() {
        let multiplier = 0.7;
        
        if (props.pref === "SUPP") {
            multiplier = 1;
        } else if (props.pref === "JG") {
            multiplier = 0.9;
        }

        // 2420+\left(\frac{-1600}{1+\left(\frac{x}{2.5}^{0.2}\right)}\right)\cdot3
        let kdabonus = ((2420 + ((-1600) / (1 + Math.pow((props.kda / 2.5), 0.2)) * 3 ))) * multiplier;

        if(Number.isNaN(kdabonus)) {
            kdabonus = 0;
        }

        return kdabonus;
    }

    function getCSBonus() {
        let csbonus = 0;

        if(props.cspm >= 4) {
            // 10\cdot\left(x-4\right)^{1.9}\ -19
            csbonus = 10 * Math.pow((props.cspm - 4), 1.9) - 20;
        }

        else {
            csbonus = -(10 * Math.pow(((props.cspm * -1) + 4), 1.9)) - 20;
        }
        

        if (props.pref === "SUPP") {
            if(csbonus <= 0) {
                csbonus = 0;
            }
        }
        else if(props.pref === "JG") {
            if(csbonus <= -20) {
                csbonus = -20;
            }
        }

        if(Number.isNaN(csbonus)) {
            csbonus = 0;
        }

        return csbonus;
    }

    function getKPBonus() {
        // \ y=1000\left(x+0.38\right)^{3}\ \ -200
        let kpbonus = (1000 * Math.pow((props.kpS + 0.38), 3) - 200);
        if (props.pref === "SUPP" || props.pref === "JG") {
            kpbonus *= 1.4;
        }
        else if (props.pref == "TOP" && kpbonus <= 0) {
            kpbonus *= 0.4;
        }

        console.log("kp:" + props.kpS);

        if(Number.isNaN(kpbonus)) {
            kpbonus = 0;
        }
        
        return kpbonus;
    }

    function getGoldBonus() {
        let goldbonus = 0;

        if(props.goldS >= 0.2) {
            // \ y=50000\left(\left(x-0.2\right)\right)^{3}
            goldbonus = 200000 * Math.pow((props.goldS -0.2), 3);
        }
        else {
            // \ y=500000\left(\left(x-0.3431\right)\right)^{5}+30
            goldbonus = 500000 * Math.pow((props.goldS -0.3431), 5);
        }

        if (props.pref === "SUPP" && goldbonus <= 0) {
            goldbonus = 0;
        }

        
        return goldbonus;
    }

    function getDmgBonus() {
        let dmgbonus = 0;

        // \ y=5000\left(x+0.3\right)^{7}\ \ -40
        if(props.dmgS >= 0.2){
            dmgbonus = (5000 * Math.pow((props.dmgS + 0.3), 7) - 40);
        }
        else {
            // \ y=500000\left(\left(x-0.3431\right)\right)^{5}+30
            dmgbonus = 500000 * Math.pow((props.dmgS -0.3431), 5);
        }
       
        if (props.pref === "SUPP") {
            if(dmgbonus <= 0) {
                dmgbonus = 0;
            }
            else {
                dmgbonus *= 1.2;
            }
            
        }
        else if (props.pref === "JG" && dmgbonus <= -20) {
            dmgbonus *= 0.7;
        }

        return dmgbonus;
    }

    function bonus() {
        let descriptor = "";
        let bonus = 0;

        let csbonus = getCSBonus();
        let kdabonus = getKDABonus();
        let kpbonus = getKPBonus();
        let dmgbonus = getDmgBonus();
        let goldbonus = getGoldBonus();
        
        let bestAspect = Math.max(csbonus, kdabonus, kpbonus, goldbonus, dmgbonus);
        let worstAspect = Math.min(csbonus, kdabonus, kpbonus, goldbonus, dmgbonus);

        if(worstAspect <= 0) {

            switch(worstAspect) {
                case csbonus:
                    descriptor = "Bad CS";
                    break;

                case kdabonus:
                    descriptor = "Bad KDA";
                    break;
    
                case kpbonus:
                    descriptor = "Lane Quarantine";
                    break;
            
                case goldbonus:
                    descriptor = "Poverty";
                    break;

                case dmgbonus: 
                    descriptor = "Pacifist";
                    break;
            }
            
        }
        
        else {
            switch(bestAspect) {
                case csbonus:
                    descriptor = "CS King";
                    break;

                case kdabonus:
                    descriptor = "KDA";
                    break;
    
                case kpbonus:
                    descriptor = "Mr.Worldwide";
                    break;
            
                case goldbonus:
                    descriptor = "Bill Gates";
                    break;

                case dmgbonus: 
                    descriptor = "Aggressive";
                    break;
            }
        }


        if(easteregg.descriptors[props.name]) {
            descriptor = easteregg.descriptors[props.name];
        }

        bonus = csbonus + kdabonus + kpbonus + goldbonus + dmgbonus;
        // console.log("kdabonus for " + props.kda + ": " + kdabonus);
        // console.log("csbonus for " + props.cspm + ": " + csbonus);
        // console.log("kpbonus for " + props.kpS + ": " + kpbonus);
        // console.log("goldbonus for " + props.goldS + ": " + goldbonus);
        // console.log("dmgbonus for " + props.dmgS + ": " + dmgbonus);
        
        return [bonus, descriptor, [csbonus, kdabonus, kpbonus, goldbonus, dmgbonus]];
    }


    return ( 
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={6}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.name}
                </Typography> 

                {(props.tier!=="UNRANKED") ?
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.tier} {props.division}
                    </Typography>
                    :
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.tier}
                    </Typography>
                }
                <Typography variant="body2" color="textSecondary" component="p"> Score: {score} </Typography> 
                <Typography variant="body2" color="textSecondary" component="p">
                    Pref: {props.pref}, {props.pref2}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p"> "{descriptor}" </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                {(stat.length === 5)?
                <StatsGraph
                    name={props.name}
                    csbonus={stat[0]}
                    kdabonus={stat[1]}
                    kpbonus={stat[2]}
                    goldbonus={stat[3]}
                    dmgbonus={stat[4]}
                />
                
                :
                <br/>
                
                }

            </Grid>
            
        </Grid>
    );


}

export default Score;