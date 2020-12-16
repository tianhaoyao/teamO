const teamTotal = (state = [], action) => {
    switch(action.type) {
        case 'UPDATESCORES':
            return action.payloadScores;
            
        default:
            return state;
    }
}

export default teamTotal;