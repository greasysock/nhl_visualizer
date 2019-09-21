import {FETCH_GAMES} from './types'

const NHL_SEASON_START = "2018-10-03"
const NHL_SEASON_END = "2019-06-12"

export const fetchGames = () => async (dispatch, getState) => {
    const {games} = getState()
    if(Object.keys(games).length === 0){
        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/schedule?startDate=${NHL_SEASON_START}&endDate=${NHL_SEASON_END}`)
        const jsonBack = await response.json()
        dispatch({type: FETCH_GAMES, payload: jsonBack.dates})
    }
}