const scoreReducer = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE':
            state[action.payloadPlayer] = action.payloadScore;
            return state;
        default:
            return state;
    }
}

export default scoreReducer;