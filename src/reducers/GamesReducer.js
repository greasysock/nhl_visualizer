import {FETCH_GAMES} from '../actions/types'

const renderWinnerLoser = (winner, loser) => {
    return {
        winnerScore: winner.score,
        loserScore: loser.score,
        difference: winner.score - loser.score,
        winnerTeamId: winner.team.id,
        loserTeamId: loser.team.id
    }
}

const resolveWinnerLoser = (home, away) => {
    if(home.score > away.score){
        return(renderWinnerLoser(home, away))
    }
    if(away.score > home.score){
        return(renderWinnerLoser(away, home))
    }
    return renderWinnerLoser(home, away)
}

export default (games={}, action) => {
    switch(action.type){
        case FETCH_GAMES:
            const newGames = {}
            action.payload.forEach((d)=>{
                d.games.forEach((g)=>{
                    newGames[g.gamePk] = {...resolveWinnerLoser(g.teams.home, g.teams.away), gameId: g.gamePk}
                })
            })
            return {...games, ...newGames}
        default:
            return games
    }
}