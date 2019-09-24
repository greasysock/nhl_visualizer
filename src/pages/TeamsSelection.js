import React from 'react'
import {useSelector} from 'react-redux'
import {useSpring, animated} from 'react-spring'
import useTeam from '../hooks/useTeam'
import {nhlLogoPath} from '../helpers'
import ContentWrapper from '../components/ContentWrapper'

const TeamSelection = ({teamId}) => {
    const {team, teamSelected, selectTeam, removeTeam} = useTeam(teamId)
    const [props, set, stop] = useSpring(() => ({opacity: 1}))
    set({opacity: teamSelected ? 1 : .2})
    stop()
    return (
        <div 
            onClick={()=>teamSelected? removeTeam():selectTeam()}
            style={{
            width: '30vh',
            height: '30vh',
            margin: '5vh'
        }}>
            <animated.img style={{...props,height: '30vh',width: '30vh'}} src={nhlLogoPath(teamId)}/>
        </div>
    )
}

const TeamsSelection = () => {
    const teams = useSelector(s=>s.teams)
    const renderTeams = () => {
        return Object.values(teams).map((team)=>{
            return <TeamSelection teamId={team.id} key={team.id}/>
        })
    }
    if(Object.keys(teams).length===0){
        return (
            <div>loading...</div>
        )
    }
    return (
        <ContentWrapper>
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap'
            }}>
                {renderTeams()}
            </div>
        </ContentWrapper>
    )
}

export default TeamsSelection