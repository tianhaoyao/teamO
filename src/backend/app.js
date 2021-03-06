
const express = require('express');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')});
const app = express();
const port = process.env.PORT;
const API_KEY = process.env.REACT_APP_TEAMO_API_KEY;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_USER_PASSWORD = process.env.MONGO_USER_PASSWORD;
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Players = require('./models/player');
const {param, body, validationResult} = require('express-validator');

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
const dbURI = 'mongodb+srv://' + MONGO_USER + ':' + MONGO_USER_PASSWORD + '@teamocache.t4kdx.mongodb.net/players?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then((result) => console.log('db connected'))
    .catch((err) => console.log(err));



async function insertPlayer(name, simplename, tier, rank, lp, cs, kda, dmg, gold, kp, pref1, pref2) {
    try{
        Players.exists({ simplename: simplename }, function(err, res) {
            if(err) {
                console.log(err)
            }
            if(!res){
                console.log(res)
                const player = new Players({
                    name: name,
                    simplename: simplename,
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
        })
    }
    catch(err) {
        console.log(err)
    }
    
    
    
}

async function getAccount(name) {
    try {
        const url = encodeURI(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`);
        const response = await axios.get(url);

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
        return response.data

    } catch (error) {
      console.error(error);
    }
}

async function getGames(accountId) {
    try {
        const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=420&api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data

    } catch (error) {
        const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=400&api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data
    }
}

async function getMatch(matchId) {
    try {
        const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data

    } catch (error) {
      console.error(error);
    }
}

app.get('/summonerName/:name', 
[
    param('name').isString().not().matches(/[\[\]\(\)\/\{\}\<\>\;\~\|\\\\=\+\`\!\@\#\$\%\^\&\*\(\)\:\.\,\'\"\?]+/),
],
async (req, res) => {
    try{
        let data = await getAccount(req.params.name)
        res.send(data)
    }
    catch (error) {
        console.error(error);
    }
})

app.get('/summonerId/:id', 
[
    param('id').matches(/^[a-zA-Z0-9\-\_]*$/)
],
async (req, res) => {
    try{
        let data = await getSummoner(req.params.id)
        res.send(data)
    }
    catch (error) {
        console.error(error);
    }
})

app.get('/games/:accountId', 
[
    param('accountId').matches(/^[a-zA-Z0-9\-\_]*$/)
],
async (req, res) => {
    try{
        let data = await getGames(req.params.accountId)
        res.send(data)
    }
    catch (error) {
        console.error(error);
    }
})

app.get('/match/:matchId', 
[
    param('matchId').matches(/^[0-9]*$/)
],

async (req, res) => {
    try{
        let data = await getMatch(req.params.matchId)
        res.send(data)
    }
    catch (error) {
        console.error(error);
    }
})

app.get('/cache/:summonerName', 
    [
        param('summonerName').isString().not().matches(/[\[\]\(\)\/\{\}\<\>\;\~\|\\\\=\+\`\!\@\#\$\%\^\&\*\(\)\:\.\,\'\"\?]+/),
    ],

    async (req, res) => {
    try{
        simplename = req.params.summonerName.replace(/\s+/g, '').toLowerCase();
        Players.findOne({ simplename: simplename }, function(err, document) {
        if(err) {
            console.log(err);
        }
        if(document != undefined) {
            res.send(document)
        }
        else {
            res.send({})
        }
    })
    }
    catch(err){
        console.log(err)
    }
    
})

app.post('/insertcache/', 
    [
        body('name').isString().not().matches(/[\[\]\(\)\/\{\}\<\>\;\~\|\\\\=\+\`\!\@\#\$\%\^\&\*\(\)\:\.\,\'\"\?]+/),
        body('simplename').isString().not().matches(/[A-Z\[\]\(\)\/\{\}\<\>\;\~\|\\\\=\+\`\!\@\#\$\%\^\&\*\(\)\:\.\,\'\"\?]+/),
        body('tier').isString().matches(/^[A-Z]*$/),
        body('rank').isString().matches(/^[IV]*$/),
        body('lp').isInt(),
        body('cs').isFloat(),
        body('kda').isFloat(),
        body('dmg').isFloat(),
        body('gold').isFloat(),
        body('kp').isFloat(),
        body('pref1').isString().matches(/^[A-Z]*$/),
        body('pref2').isString().matches(/^[A-Z]*$/)
    ],
        function(req, res){
    try {
        const validationErr = validationResult(req);
        console.log(validationErr)
        if(!validationErr.isEmpty()){
            console.log('rejected')
            res.sendStatus(422)
        }
        else{
            console.log('inserting')
            let name = req.body.name
            let simplename = req.body.simplename
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

            insertPlayer(name, simplename, tier, rank, lp, cs, kda, dmg, gold, kp, pref1, pref2)
            res.sendStatus(200);
        }
        
    }
    catch(err) {
        console.log(err)
    }
})

app.get('/cache/', async (req, res) => {
    try{
        Players.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    catch(err) {
        console.log(err)
    }
    


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