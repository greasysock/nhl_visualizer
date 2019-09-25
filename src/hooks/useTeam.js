import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {selectTeam, removeTeam} from '../actions'
const useTeam = (teamId) => {
    const dispatch = useDispatch()
    const {team, teamSelected} =  useSelector(s=>{
        const team = s.teams[teamId]
        const teamSelected = s.selectedTeams[teamId]
        return {team, teamSelected}
    })
    const select = () => {
        dispatch(selectTeam(teamId))
    }
    const remove = () => {
        dispatch(removeTeam(teamId))
    }
    return {team, teamSelected, selectTeam:select, removeTeam:remove}
}

export default useTeam