
const express = require('express')
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
var cors = require('cors')
const app = express()
const port = 3001
const API_KEY = process.env.REACT_APP_TEAMO_API_KEY;
var bodyParser = require('body-parser')
const axios = require('axios');

let requestcount = 0;


app.use(cors())

async function getAccount(name) {
    try {
        const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        requestcount++;
        console.log(requestcount);
        return response.data
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})