export const update = (player, score) => {
    return {
        type: 'UPDATE',
        payloadPlayer: player,
        payloadScore: score
    }
}