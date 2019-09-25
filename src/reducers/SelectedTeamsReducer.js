import {REMOVE_TEAM, SELECT_TEAM,SELECT_TEAMS, CLEAR_TEAMS} from '../actions/types'
import { selectTeams } from '../actions'

const DEFAULT_TEAMS = {8:true, 10:true, 12:true, 17:true}

export default (selectedTeams=DEFAULT_TEAMS,action)=>{
    switch(action.type){
        case SELECT_TEAM:
            selectedTeams[action.payload] = true
            return {...selectedTeams}
        case SELECT_TEAMS:
            return {...selectedTeams, ...action.payload}
        case CLEAR_TEAMS:
            return {}
        case REMOVE_TEAM:
            const modifiedTeams = {...selectedTeams}
            delete modifiedTeams[action.payload]
            return modifiedTeams
        default:
            return selectedTeams
    }
}