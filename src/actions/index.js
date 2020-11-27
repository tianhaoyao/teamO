export const updatePlayer = (player, score, pref, pref2, tier, division, descriptor) => {
    return {
        type: 'UPDATE',
        payloadPlayer: player,
        payloadScore: score,
        payloadPref: pref,
        payloadPref2: pref2,
        payloadTier: tier,
        payloadDivision: division,
        payloadDescriptor: descriptor
    }
}

export const deletePlayer = (player) => {
    return {
        type: 'DELETE',
        payloadPlayer: player
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