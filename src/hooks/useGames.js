import {useSelector} from 'react-redux'
import useTeams from './useTeams'

const useGames = () => {
    const teams = useTeams()
    const games = useSelector(s=>Object.values(s.games).filter(game=>{
        return teams[game.winnerTeamId]&&teams[game.loserTeamId]
    }))
    return games
}

export default useGames