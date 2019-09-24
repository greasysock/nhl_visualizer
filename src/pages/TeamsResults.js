import React from 'react'
import useTeams from '../hooks/useTeams'
import useTeam from '../hooks/useTeam'
import useGames from '../hooks/useGames'
import {nhlLogoPath, masseyMethod, colleyMethod} from '../helpers'
import ContentWrapper from '../components/ContentWrapper'


const merge = (left, right) =>{
    const result = []
    let leftIndex = 0
    let rightIndex = 0
    while(leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex].rank > right[rightIndex].rank){
            result.push(left[leftIndex])
            leftIndex++
        } else{
            result.push(right[rightIndex])
            rightIndex++
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

const mergeSortComponents = (array=[]) => {
    if(array.length===1){
        return array
    }
    const center = Math.floor(array.length/2)
    const right = array.slice(center)
    const left = array.slice(0, center)
    
    return (
        merge(mergeSortComponents(left), mergeSortComponents(right))
    )
}

const TeamRank = ({teamId, rank, place}) => {
    const {team} = useTeam(teamId)
    const pos = rank * -200
    
    return (
        <div
        style = {{
            width: '10vw',
            height: '10vw',
            margin: '5vw',
            position: 'relative',
            left: pos

        }}
        >
            <img style={{width: '10vw', height: '10vw'}} src={nhlLogoPath(teamId)}/>
            {team.name}
            <div>{rank}</div>
            <div>{place}</div>
        </div>
    )

}

const TeamsResults = () => {
    const games = useGames()
    const teams = useTeams()
    const masseyResults = masseyMethod(games, teams)
    const colleyResults = colleyMethod(games, teams)

    const renderTeamRanks = () => {
        
        const unorderedComponents =  Object.values(teams).map((t)=>{
            return {componentProps:{ teamId:t.id, rank:colleyResults[t.id], key:t.id}, rank: colleyResults[t.id]}
        })
        const orderedComponents = mergeSortComponents(unorderedComponents)
        let level = 0
        return orderedComponents.map((c)=>{
            level++
            return <TeamRank {...c.componentProps} place={level}/>
        })
    }

    return (
        <>
        <ContentWrapper>
            Massey's Method
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    alignContent: 'center'
                }}
            >
            {renderTeamRanks()}
            </div>
        </ContentWrapper>
        </>
    )
}

export default TeamsResults