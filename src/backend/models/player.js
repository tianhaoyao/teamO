const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tier: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    lp: {
        type: Number,
        required: true
    },
    cs: {
        type: Number,
        required: true
    },
    kda: {
        type: Number,
        required: true
    },
    dmg: {
        type: Number,
        required: true
    },
    gold: {
        type: Number,
        required: true
    },
    kp: {
        type: Number,
        required: true
    },
    pref1: {
        type: String,
        required: true
    },
    pref2: {
        type: String,
        required: true
    },

}, { timestamps: true });

const Players = mongoose.model('player', playerSchema);

module.exports = Players;