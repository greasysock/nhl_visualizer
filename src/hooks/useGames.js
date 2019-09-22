import {useSelector} from 'react-redux'
import useTeams from './useTeams'

const useGames = () => {
    const teams = useTeams()
    const games = useSelector(s=>Object.values(s.games))
    const filteredGames = games.filter((game)=>teams[game.winnerTeamId] && teams[game.loserTeamId])

    return filteredGames
}

export default useGames