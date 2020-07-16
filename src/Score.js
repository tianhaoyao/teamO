import React from "react";

const Score = ({tier, division, lp, wins, losses}) => {

    function calculate() {
        
        let lookup = {"IRON": 300, 
                    "BRONZE": 700,
                    "SILVER": 1200, 
                      "GOLD": 1800,
                  "PLATINUM": 2200,
                   "DIAMOND": 2600,
                    "MASTER": 3000,
               "GRANDMASTER": 3300,
                "CHALLENGER": 3500
        }
        let divisionLookup = {"IV": 0,
                         "III": 100,
                          "II": 200,
                           "I": 300
        }
        return lookup[tier] + divisionLookup[division] + lp;


    }

    return(
        <p>Score: {calculate()}</p>
    );
}

export default Score;