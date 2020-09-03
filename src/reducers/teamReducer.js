const teamReducer = (state = [], action) => {
    switch(action.type) {
        case 'REFRESHTEAM':
            return action.payloadTeam;
            
        default:
            return state;
    }
}

export default teamReducer;