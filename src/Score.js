import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { updatePlayer } from './actions';
import { useDispatch } from 'react-redux';
import * as rankData from './settings/ranks.json';

function Score(props) {

    const dispatch = useDispatch();

    const [score, setScore] = useState(0);
    const [name, setName] = useState("");
    const [pref, setPref] = useState("");
    const [pref2, setPref2] = useState("");

    useEffect(() => {
        calculate();
    }, []);




    function calculate() {
        console.log(props.tier);
        console.log(props.division);
        let name = props.name;
        
        let baseScore = rankData.rankScore[props.tier][props.division];
        let lpScore = props.lp * rankData.lpMultiplier[props.tier];

        if(props.tier === "MASTER" || props.tier === "GRANDMASTER" || props.tier === "CHALLENGER") {
            lpScore = Math.pow(lpScore, 1.07);
        }

        let finalScore = Math.round(baseScore + lpScore + bonus());
        let pref = props.pref;
        let pref2 = props.pref2;
        setName(name);
        setScore(finalScore);
        setPref(pref);
        setPref2(pref2);

        dispatch(updatePlayer(name, finalScore, pref, pref2, props.tier, props.division));

        return finalScore;



    }

    function bonus() {
        let bonus = 0;
        let csbonus = 0;
        // cs
        if (props.pref !== "SUPPORT" && props.pref !== "JUNGLE") {
            // 8\cdot\left(x-5\right)^{3}
            csbonus = 8 * Math.pow((props.cspm - 5), 3);
            bonus += csbonus;
        }

        // kda
        let multiplier = 0.6;
        
        if (props.pref === "SUPPORT") {
            multiplier = 1;
        } else if (props.pref === "JUNGLE") {
            multiplier = 0.8;
        }

        // 2420+\left(\frac{-1600}{1+\left(\frac{x}{2.5}^{0.2}\right)}\right)\cdot3
        let kdabonus = ((2420 + ((-1600) / (1 + Math.pow((props.kda / 2.5), 0.2)) * 3 ))) * multiplier;

        if(Number.isNaN(csbonus)) {
            csbonus = 0;
        }
        if(Number.isNaN(kdabonus)) {
            kdabonus = 0;
        }


        bonus = bonus + kdabonus;
        console.log("kdabonus for " + props.kda + ": " + kdabonus);
        console.log("csbonus for " + props.cspm + ": " + csbonus);
        
        return bonus;
    }


    return ( 
        <div> <Typography variant="body2" color="textSecondary" component="p"> Score: {score} </Typography> </div>
    );


}

export default Score;