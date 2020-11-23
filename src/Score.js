import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { updatePlayer } from './actions';
import { useDispatch } from 'react-redux';

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
        let lookup = {
            "IRON": 300,
            "BRONZE": 700,
            "SILVER": 1200,
            "GOLD": 1800,
            "PLATINUM": 2200,
            "DIAMOND": 2600,
            "MASTER": 3000,
            "GRANDMASTER": 3300,
            "CHALLENGER": 3500,
            "UNRANKED": 1000
        }
        let divisionLookup = {}

        if (lookup[props.tier] >= lookup["PLATINUM"]) {
            divisionLookup = {
                "IV": 0,
                "III": 200,
                "II": 400,
                "I": 600
            }

        } else {
            divisionLookup = {
                "IV": 0,
                "III": 100,
                "II": 200,
                "I": 300
            }

        }
        let name = props.name;
        console.log("got cs" + props.cspm);
        console.log("got kda" + props.kda);
        let s = lookup[props.tier] + divisionLookup[props.division] + props.lp + bonus();
        let pref = props.pref;
        let pref2 = props.pref2;
        setName(name);
        setScore(s);
        setPref(pref);
        setPref2(pref2);

        dispatch(updatePlayer(name, s, pref, pref2));

        return lookup[props.tier] + divisionLookup[props.division] + props.lp;



    }

    function bonus() {
        let bonus = 0;
        let csbonus = 0;
        // cs
        console.log(props.cspm);
        if (props.pref != "SUPPORT" && props.pref != "JUNGLE") {
            csbonus = Math.round(5 * Math.pow((props.cspm - 5), 3));
            bonus += csbonus;
        }

        // kda
        let multiplier = 0.3;
        
        if (props.pref == "SUPPORT") {
            multiplier = 1;
        } else if (props.pref == "JUNGLE") {
            multiplier = 0.8;
        }

        
        let kdabonus = Math.round((879.99430 + (-381.7352 - 679.99430) / (1 + Math.pow((props.kda / 19.458590), 0.7643032))) * multiplier);
        if(Number.isNaN(csbonus)) {
            csbonus = 0;
        }
        if(Number.isNaN(kdabonus)) {
            kdabonus = 0;
        }


        bonus += kdabonus;
        console.log(props.kda)
        console.log("kdabonus" + kdabonus);
        console.log("csbonus" + csbonus);
        
        return bonus;
    }


    return ( <
        div >
        <
        Typography variant = "body2"
        color = "textSecondary"
        component = "p" > Score: { score } < /Typography> <
        /div>
    );


}

export default Score;