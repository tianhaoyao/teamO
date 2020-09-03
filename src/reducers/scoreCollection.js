const scoreReducer = (state = [], action) => {
    switch(action.type) {
        case 'UPDATE':
            return [...state, [action.payloadPlayer, action.payloadScore, action.payloadPref, action.payloadPref2]];
            
        default:
            return state;
    }
}

export default scoreReducer;