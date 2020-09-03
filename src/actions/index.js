export const updatePlayer = (player, score, pref, pref2) => {
    return {
        type: 'UPDATE',
        payloadPlayer: player,
        payloadScore: score,
        payloadPref: pref,
        payloadPref2: pref2
    }
}

export const updateTeam = (team) => {
    return {
        type: 'REFRESHTEAM',
        payloadTeam: team
    }
}

export const updateTotal = (totals) => {
    return {
        type: 'UPDATESCORES',
        payloadScores: totals
    }
}