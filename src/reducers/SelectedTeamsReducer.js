import {REMOVE_TEAM, SELECT_TEAM} from '../actions/types'

const DEFAULT_TEAMS = [8, 10, 12, 17]

export default (selectedTeams=DEFAULT_TEAMS,action)=>{
    switch(action.type){
        case SELECT_TEAM:
            selectedTeams.push(action.payload)
            return [...selectedTeams]
        case REMOVE_TEAM:
            return selectedTeams.filter((i)=>i!==action.payload)
        default:
            return selectedTeams
    }
}