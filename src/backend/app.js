
const express = require('express')
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
var cors = require('cors')
const app = express()
const port = 3001
const API_KEY = process.env.REACT_APP_TEAMO_API_KEY;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_USER_PASSWORD = process.env.MONGO_USER_PASSWORD;
const bodyParser = require('body-parser')

const axios = require('axios');
const mongoose = require('mongoose')
const Players = require('./models/player')
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
const dbURI = 'mongodb+srv://' + MONGO_USER + ':' + MONGO_USER_PASSWORD + '@teamocache.t4kdx.mongodb.net/players?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then((result) => console.log('db connected'))
    .catch((err) => console.log(err));
// const client = new MongoClient(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("players").collection("players");
//     // perform actions on the collection object
//     client.close();
//   });
let requestcount = 0;


app.use(cors())

async function insertPlayer(name, tier, rank, lp, cs, kda, dmg, gold, kp, pref1, pref2) {
    Players.exists({ name: name }, function(err, res) {
        if(err) {
            console.log(err)
        }
        if(!res){
            console.log(res)
            const player = new Players({
                name: name,
                tier: tier,
                rank: rank,
                lp: lp,
                cs: cs,
                kda: kda,
                dmg: dmg,
                gold: gold,
                kp: kp,
                pref1: pref1,
                pref2: pref2
            })
            player.save()
        }
        else {
            console.log("exists arleady")
        }
    })
    
    
}

async function getAccount(name) {
    try {
        const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        requestcount++;
        console.log(requestcount);
        console.log("getAccount")

        const data = {
            id: response.data.id,
            accountId: response.data.accountId,
            name: response.data.name
        }

        return data
    } catch (error) {
        console.error(error);
    }
    
}

async function getSummoner(id) {
    try {
        const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        requestcount++;
        console.log(requestcount);
        console.log("getSummoner")
        return response.data
    } catch (error) {
      console.error(error);
    }
}

async function getGames(accountId) {
    try {
        const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=420&api_key=${API_KEY}`;
        const response = await axios.get(url);
        requestcount++;
        console.log(requestcount);
        console.log("getGames")
        return response.data
    } catch (error) {
        const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=400&api_key=${API_KEY}`;
        const response = await axios.get(url);
        console.log("normals");
        return response.data
    }
}

async function getMatch(matchId) {
    try {
        const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        requestcount++;
        console.log(requestcount);
        console.log("getMatch")
        return response.data
    } catch (error) {
      console.error(error);
    }
}

app.get('/summonerName/:name', async (req, res) => {
    try{
        let data = await getAccount(req.params.name)
        res.send(data)
    }
    catch (error) {
        console.error(error);
    }
})

app.get('/summonerId/:id', async (req, res) => {
    try{
        let data = await getSummoner(req.params.id)
        res.send(data)
    }
    catch (error) {
        console.error(error);
    }
})

app.get('/games/:accountId', async (req, res) => {
    try{
        let data = await getGames(req.params.accountId)
        res.send(data)
    }
    catch (error) {
        console.error(error);
    }
})

app.get('/match/:matchId', async (req, res) => {
    try{
        let data = await getMatch(req.params.matchId)
        res.send(data)
    }
    catch (error) {
        console.error(error);
    }
})

app.get('/cache/:summonerName', async (req, res) => {
    Players.findOne({ name: req.params.summonerName }, function(err, document) {
        if(err) {
            console.log(err);
        }
        if(document != undefined) {
            console.log("found, sending")
            console.log(document)
            res.send(document)
        }
        else {
            console.log("didnt find!!")
            res.send({})
        }
    })
})

app.post('/insertcache/', function(req, res){
    try {
        let name = req.body.name
        let tier = req.body.tier
        let rank = req.body.rank
        let lp = parseInt(req.body.lp)
        let cs = parseFloat(req.body.cs)
        let kda = parseFloat(req.body.kda)
        let dmg = parseFloat(req.body.dmg)
        let gold = parseFloat(req.body.gold)
        let kp = parseFloat(req.body.kp)
        let pref1 = req.body.pref1
        let pref2 = req.body.pref2

        insertPlayer(name, tier, rank, lp, cs, kda, dmg, gold, kp, pref1, pref2)
        res.sendStatus(200);
    }
    catch(err) {
        console.log(err)
    }
})

app.get('/cache/', async (req, res) => {
    
    Players.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })


})

app.post('/clearcache/', function(req, res){
    try {
        Players.deleteMany({}, function(req, res){})
        res.sendStatus(200);
    }
    catch(err) {
        console.log(err)
    }
})


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})