import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import useTeams from '../hooks/useTeams'
import {selectTeams, clearTeams} from '../actions'

const SelectionCounter = () => {
    const teams = Object.values(useTeams())
    const allTeams = useSelector(s=>Object.values(s.teams))
    const dispatch = useDispatch()

    return (
        <div
            style={{
                display: 'flex',
                position: 'fixed',
                bottom: '10vh',
                justifyContent: 'center',
                width: '100vw'

            }
            }
        >
            <div
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    padding: 3,
                    backgroundColor: 'white',
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px'
                }}    
            >
                {teams.length} teams selected
            </div>
            <div
                onClick={()=>{
                    const teamMap = {}
                    allTeams.forEach(team=>{teamMap[team.id]=true})
                    dispatch(selectTeams(teamMap))
                }}
                style={{
                    padding: 3,
                    borderColor: 'black',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    backgroundColor: 'white'
                }}
            >Select All</div>
            <div
                onClick={()=>{
                    dispatch(clearTeams())
                }}
                style={{
                    padding: 3,
                    borderColor: 'black',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    backgroundColor: 'white',
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px'
                }}
            >Clear</div>
        </div>
    )
}

export default SelectionCounter