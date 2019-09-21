import {useSelector} from 'react-redux'

const useTeams = () => {
    const teams = useSelector(state=>{
        const filteredTeams = {}
        state.selectedTeams.forEach(t=>{
            if(state.teams[t]){
                filteredTeams[t] = state.teams[t]
            }
        })
        return filteredTeams
    })
    return teams
}

export default useTeams