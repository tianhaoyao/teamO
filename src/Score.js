import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import {update} from './actions';
import {useDispatch} from 'react-redux';
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
        console.log(props);
        console.log(props.name);
        console.log(props.pref);
        console.log(props.pref2);
        let lookup = {"IRON": 300, 
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
        let divisionLookup = {"IV": 0,
                            "III": 100,
                            "II": 200,
                            "I": 300
        }
        let name = props.name;
        let s = lookup[props.tier] + divisionLookup[props.division] + props.lp;
        let pref = props.pref;
        let pref2 = props.pref2;
        setName(name);
        setScore(s);
        setPref(pref);
        setPref2(pref2);
        
        dispatch(update(name, s, pref, pref2));
        
        return lookup[props.tier] + divisionLookup[props.division] + props.lp;
        


    }
    
    
    return(
        <div>
            <Typography variant="body2" color="textSecondary" component="p">Score: {score}</Typography>
            {/* <Button onClick={this.props.setScore}>here</Button> */}
        </div>
    );
    
    
}

export default Score;