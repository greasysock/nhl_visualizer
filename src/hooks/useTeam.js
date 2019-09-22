import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {selectTeam, removeTeam} from '../actions'
const useTeam = (teamId) => {
    const dispatch = useDispatch()
    const [teamSelected, setTeamSelected] = useState(false)
    const team =  useSelector(s=>{
        let selectedTeam = {}
        Object.values(s.teams).forEach((t)=>{if(t.id===teamId){selectedTeam=t}})
        for(let i = 0; i < s.selectedTeams.length;i++){
            if((s.selectedTeams[i] === teamId)&&!teamSelected){
                setTeamSelected(true)
                break
            }
        }
        return selectedTeam
    })
    const select = () => {
        dispatch(selectTeam(teamId))
        setTeamSelected(true)
    }
    const remove = () => {
        dispatch(removeTeam(teamId))
        setTeamSelected(false)
    }
    return {team, teamSelected, selectTeam:select, removeTeam:remove}
}

export default useTeam