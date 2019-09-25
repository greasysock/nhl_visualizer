import {
    FETCH_TEAM,
    FETCH_TEAMS,
    SELECT_TEAM,
    REMOVE_TEAM,
    SELECT_TEAMS,
    CLEAR_TEAMS
} from './types'

export const fetchTeams = () => async (dispatch, getState) => {
    const {teams} = getState()
    if(Object.keys(teams).length===0){
        const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
        const jsonBack = await response.json()
        dispatch({type: FETCH_TEAMS, payload: jsonBack.teams})
    }
}

export const selectTeam = teamId => {
    return {type: SELECT_TEAM, payload: teamId}
}

export const selectTeams = teamIds => {
    return {type: SELECT_TEAMS, payload: teamIds}
}

export const clearTeams = () => {
    return {type: CLEAR_TEAMS}
}

export const removeTeam = teamId => {
    return {type: REMOVE_TEAM, payload: teamId}
}