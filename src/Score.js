import React from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Score extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props);
        this.state={
            tier: this.props.tier,
            division: this.props.division,
            lp: this.props.lp,
            wins: this.props.wins,
            losses: this.props.losses,
            score: 0
        }
        
        this.calculate = this.calculate.bind(this);
    }

    componentDidMount(){
        this.calculate();
        
    }

    


    calculate = async() => {
        
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
        this.setState({score: lookup[this.state.tier] + divisionLookup[this.state.division] + this.state.lp});
        


    }
    
    render(){
        return(
            <div>
                <Typography variant="body2" color="textSecondary" component="p">Score: {this.state.score}</Typography>
                {/* <Button onClick={this.props.setScore}>here</Button> */}
            </div>
        );
    }
    
}

export default Score;