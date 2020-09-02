export const update = (player, score, pref, pref2) => {
    return {
        type: 'UPDATE',
        payloadPlayer: player,
        payloadScore: score,
        payloadPref: pref,
        payloadPref2: pref2
    }
}