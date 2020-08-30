import scoreReducer from './scoreCollection.js';

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    scoreReducer: scoreReducer
})

export default allReducers;