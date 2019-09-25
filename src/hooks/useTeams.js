import {useSelector} from 'react-redux'

const useTeams = () => {
    const teams = useSelector(state=>{
        const filteredTeams = {}
        Object.keys(state.selectedTeams).forEach((teamId)=>{
            filteredTeams[teamId] = state.teams[teamId]
        })
        return filteredTeams
    })
    return teams
}

export default useTeams