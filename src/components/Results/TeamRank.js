import React from 'react'
import useTeam from '../../hooks/useTeam'
import {nhlLogoPath} from '../../helpers'

const RankNumber = ({rank}) => {
    return (
        <div style={{alignSelf: 'center'}}>{rank}</div>
    )
}
const TeamName = ({name}) => {
    return (
        <div style={{alignSelf: 'center'}}>{name}</div>
    )
}
const TeamLogo = ({teamId}) => {
    return (
        <img style={{width: '10vw', height: '10vw', alignSelf: 'center'}} src={nhlLogoPath(teamId)}/>
    )
}

const TeamPlace = ({place}) => {
    return (
        <div
            style={{
                position: 'relative',
                left: '1vh',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '50%',
                width: '4vh',
                height: '4vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 10
            }}
        ><div style={{alignSelf: 'center', fontSize: '1.5vh', fontFamily: 'Roboto Mono'}}>
            {place}
        </div>
        </div>
    )
}

const TeamRank = ({teamId, rank, place}) => {
    const {team} = useTeam(teamId)
    
    return (
        <div
        style = {{
            width: '12vw',
            height: '15vw',
            margin: '5vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center'

        }}
        >
            <TeamPlace place={place}/>
            <TeamLogo teamId={teamId}/> 
            <TeamName name={team.name}/>
            <RankNumber rank={rank}/>
        </div>
    )

}

export default TeamRank