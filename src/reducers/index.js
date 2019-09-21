import {combineReducers} from 'redux'

import TeamsReducer from './TeamsReducer'
import GamesReducer from './GamesReducer'
import PagesConfigReducer from './PagesConfigReducer'
import SelectedTeamsReducer from './SelectedTeamsReducer'

export default combineReducers({
    teams: TeamsReducer,
    games: GamesReducer,
    pagesConfig: PagesConfigReducer,
    selectedTeams: SelectedTeamsReducer
})