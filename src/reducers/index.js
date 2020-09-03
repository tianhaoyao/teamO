import scoreReducer from './scoreCollection.js';
import teamReducer from './teamReducer.js';
import teamTotal from './teamTotal.js';

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    scoreReducer: scoreReducer,
    teamReducer: teamReducer,
    teamTotal: teamTotal
});

export default allReducers;