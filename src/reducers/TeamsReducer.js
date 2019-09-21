import {FETCH_TEAMS, FETCH_TEAM} from '../actions/types'

export default (teams = {}, action) => {
    switch(action.type){
        case FETCH_TEAMS:
            const newTeams = {}
            action.payload.forEach((t)=>{
                newTeams[t.id] = t
            })
            return {...teams, ...newTeams}
        default:
            return teams
    }
}