import {combineReducers} from 'redux'

import TeamsReducer from './TeamsReducer'
import GamesReducer from './GamesReducer'

export default combineReducers({
    teams: TeamsReducer,
    games: GamesReducer
})