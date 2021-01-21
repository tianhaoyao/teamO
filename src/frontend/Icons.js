import React from "react";

function Icons(props){


    let divisionLookup = {"IV": 4,
                         "III": 3,
                          "II": 2,
                           "I": 1
        }

    const style = {
        height: 100
    }

    return(
        <div>
            {props.tier === "UNRANKED" ?
                <img style={style} src={`//opgg-static.akamaized.net/images/medals/default.png?image=q_auto&v=1`}></img>
            :
                <img style={style} src={`//opgg-static.akamaized.net/images/medals/${props.tier}_${divisionLookup[props.division]}.png?image=q_auto&v=1`}></img>
            }
        </div>
    );
        
        
    
    
    
}

export default Icons;