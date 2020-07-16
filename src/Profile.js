import React from 'react';
import logo from './teamo.png'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Score from './Score';


const API_KEY = ;
const proxyurl = "https://cors-anywhere.herokuapp.com/";

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {profile: {}, query: 'mimai'}
    console.log(this.state);
    this.getRank = this.getRank.bind(this);
    this.getProfile = this.getProfile.bind(this);
    //this.getRole = this.getRole.bind(this);
  }

  // getRank = async () => {
  //   if(this.state.profile.summonerName == "mimai") {
  //     this.setState({profile: {summonerName: this.props.name, tier: 'PLATINUM', division: 'I', lp: 9}})
  //   }
  //   else {
  //     this.setState({profile: {summonerName: this.props.name, tier: 'IRON', division: 'IV', lp: 4}})
  //   }
  // }

  componentDidMount(){
    this.getRank();
    //this.getRole();
    console.log(this.state)
  }

  getProfile = async () => {
    

    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.state.query}?api_key=${API_KEY}`;
    const response = await fetch(proxyurl + url);

    const data = await response.json();
    //console.log(data)
    return data;

  }

  getRank = async () => {

    let id = await this.getProfile();
    const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id.id}?api_key=${API_KEY}`;
    const response = await fetch(proxyurl + url);

    const data = await response.json();
    let data3;
    let i;
    for(i = 0; i < data.length; i++) {
      if (data[i].queueType.localeCompare('RANKED_SOLO_5x5') == 0) {
        data3 = data[i];

      }
    }
    //console.log(data3)
    this.setState({profile: data3});
  }

  // getRole = async () => {

  //   let id = await this.getProfile();
  //   const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id.accountId}?queue=420&season=13&api_key=${API_KEY}`;
  //   const response = await fetch(proxyurl + url);
  //   const data = await response.json();
  //   //console.log(data)

  //   let i;
  //   let rankedCount = {"MID":0, "TOP":0, "SUPPORT":0, "BOTTOM":0, "JUNGLE":0};
  //   for(i = 0; i < data.matches.length; i++) {
  //     if (data.matches[i].lane.localeCompare('MID') == 0) {
  //       rankedCount["MID"] += 1;
  //     }
  //     else if (data.matches[i].lane.localeCompare('JUNGLE') == 0) {
  //       rankedCount["JUNGLE"] += 1;
  //     }
  //     else if (data.matches[i].lane.localeCompare('BOTTOM') == 0) {
  //       rankedCount["BOTTOM"] += 1;
  //     }
  //     else if (data.matches[i].lane.localeCompare('SUPPORT') == 0) {
  //       rankedCount["SUPPORT"] += 1;
  //     }
  //     else if (data.matches[i].lane.localeCompare('TOP') == 0) {
  //       rankedCount["TOP"] += 1;
  //     }
  //   }
  //   console.log("set role", rankedCount)
  //   this.setState({role: rankedCount});

  // }

  render(){
    const summonerName = this.state.profile.summonerName;
    const tier = this.state.profile.tier;
    const division = this.state.profile.division;
    //const role = this.state.role;
    const lp = this.state.profile.lp;
    
    return (
      <div className="Profile">
        <Card className="profile">
          <CardActionArea>
            {/* <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {summonerName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {tier} - {division}
              </Typography>
              <Score
                tier={tier}
                division={division}
                lp={lp}
                wins="0"
                losses="0"
                />
            </CardContent>
          </CardActionArea>
          {/* <CardActions>
            <Button size="small" color="primary">
              Remove
            </Button>
            <Button size="small" color="primary">
              Edit
            </Button>
          </CardActions> */}
        </Card>
      </div>
    );
  }
  
}

export default Profile;
