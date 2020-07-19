import React from "react";

class Icons extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props);
        this.state={
            tier: this.props.tier,
            division: this.props.division,
            imageUrl: ''
        }
    }

    componentDidMount(){
        this.calculate();
        
    }

    


    calculate = async() => {

        let divisionLookup = {"IV": 4,
                         "III": 3,
                          "II": 2,
                           "I": 1
        }
        if(this.state.tier == "UNRANKED") {
            this.setState({imageUrl: `//opgg-static.akamaized.net/images/medals/default.png?image=q_auto&v=1`})
        }
        else{
            this.setState({imageUrl: `//opgg-static.akamaized.net/images/medals/${this.state.tier}_${divisionLookup[this.state.division]}.png?image=q_auto&v=1`})
        }
        
        
        

    }
    
    render(){
        const imageUrl = this.state.imageUrl;
        const style = {
            height: 100
        }
        return(
            <div>
                <img style={style} src={imageUrl}></img>
            </div>
        );
    }
    
}

export default Icons;