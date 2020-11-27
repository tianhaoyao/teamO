import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { updatePlayer } from './actions';
import { useDispatch } from 'react-redux';
import * as rankData from './settings/ranks.json';
import * as easteregg from './settings/easteregg.json';

function Score(props) {

    const dispatch = useDispatch();

    const [score, setScore] = useState(0);
    const [descriptor, setDescriptor] = useState("");
    const [name, setName] = useState("");
    const [pref, setPref] = useState("");
    const [pref2, setPref2] = useState("");

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
        let finalScore = Math.round(baseScore + lpScore + bonusScore);
        let pref = props.pref;
        let pref2 = props.pref2;

        setName(name);
        setScore(finalScore);
        setPref(pref);
        setPref2(pref2);
        setDescriptor(descriptor);

        dispatch(updatePlayer(name, finalScore, pref, pref2, props.tier, props.division, descriptor));

        return finalScore;



    }

    function getKDABonus() {
        let multiplier = 0.6;
        
        if (props.pref === "SUPPORT") {
            multiplier = 1;
        } else if (props.pref === "JUNGLE") {
            multiplier = 0.8;
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

        if (props.pref !== "SUPPORT" && props.pref !== "JUNGLE") {
            // 8\cdot\left(x-5\right)^{3}
            csbonus = 8 * Math.pow((props.cspm - 5), 3);
            bonus += csbonus;
        }

        if(Number.isNaN(csbonus)) {
            csbonus = 0;
        }

        return csbonus;
    }

    function getKPBonus() {
        let kpbonus = 0;
        let multiplier = 1;
        if (props.pref == "SUPPORT" || props.pref == "JUNGLE") {
            multiplier = 1.4;
        }
        else if (props.pref == "TOP") {
            multiplier = 0.4;
        }

        // \ y=1000\left(x+0.38\right)^{3}\ \ -200
        kpbonus = (1000 * Math.pow((props.kpS + 0.38), 3) - 200) * multiplier;
        return kpbonus;
    }

    function getGoldBonus() {
        let goldbonus = 0;
        let multiplier = 1;
        if (props.pref == "SUPPORT") {
            multiplier = 0;
        }

        if(props.goldS >= 0.2) {
            // \ y=50000\left(\left(x-0.2\right)\right)^{3}
            goldbonus = 200000 * Math.pow((props.goldS -0.2), 3) * multiplier;
        }
        else {
            // \ y=500000\left(\left(x-0.3431\right)\right)^{5}+30
            goldbonus = 500000 * Math.pow((props.goldS -0.3431), 5) * multiplier;
        }

        
        return goldbonus;
    }

    function getDmgBonus() {
        let dmgbonus = 0;
        let multiplier = 1;
        if (props.pref == "SUPPORT") {
            multiplier = 0.2;
        }
        else if (props.pref == "JUNGLE") {
            multiplier = 0.7;
        }

        // \ y=5000\left(x+0.3\right)^{7}\ \ -40
        if(props.dmgS >= 0.2){
            dmgbonus = (5000 * Math.pow((props.dmgS + 0.3), 7) - 40) * multiplier;
        }
        else {
            // \ y=500000\left(\left(x-0.3431\right)\right)^{5}+30
            dmgbonus = 500000 * Math.pow((props.dmgS -0.3431), 5) * multiplier;
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
        
        let worstAspect = Math.min(csbonus, kdabonus, kpbonus, goldbonus, dmgbonus);

        if(worstAspect <= 0) {

            if(worstAspect == csbonus) {
                descriptor = "Zerojaw CS";
            }

            else if(worstAspect == kdabonus) {
                descriptor = "0/16/2 in 3 games";
            }
    
            else if(worstAspect == kpbonus) {
                descriptor = "Quarantined in Lane";
            }
            
            else if(worstAspect == goldbonus) {
                descriptor = "Lives in Poverty";
            }

            else if(worstAspect == dmgbonus) {
                descriptor = "Pacifist";
            }
            
        }
        
        else {
            descriptor = "Ok you're not too shabby";
        }


        if(easteregg.descriptors[props.name]) {
            descriptor = easteregg.descriptors[props.name];
        }

        bonus = csbonus + kdabonus + kpbonus + goldbonus + dmgbonus;
        console.log("kdabonus for " + props.kda + ": " + kdabonus);
        console.log("csbonus for " + props.cspm + ": " + csbonus);
        console.log("kpbonus for " + props.kpS + ": " + kpbonus);
        console.log("goldbonus for " + props.goldS + ": " + goldbonus);
        console.log("dmgbonus for " + props.dmgS + ": " + dmgbonus);
        
        return [bonus, descriptor];
    }


    return ( 
        <div> 
            <Typography variant="body2" color="textSecondary" component="p"> Score: {score} </Typography> 
            <Typography variant="body2" color="textSecondary" component="p"> "{descriptor}" </Typography>
        </div>
    );


}

export default Score;