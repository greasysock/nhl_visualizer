import {
    FETCH_TEAM,
    FETCH_TEAMS
} from './types'

export const fetchTeams = () => async dispatch => {
    const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
    const jsonBack = await response.json()
    dispatch({type: FETCH_TEAMS, payload: jsonBack.teams})
}