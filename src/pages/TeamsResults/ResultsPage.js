import React from 'react'
import useTeams from '../../hooks/useTeams'
import useGames from '../../hooks/useGames'
import ContentWrapper from '../../components/ContentWrapper'
import TitleWrap from '../../components/TitleWrap'
import TeamRank from '../../components/Results/TeamRank'
import FlexResults from '../../components/Results/FlexResults'
import {mergeSortComponents} from '../../helpers'

const ResultsSection = ({calculationMethod}) =>{
    const games = useGames()
    const teams = useTeams()
    if(games.length===0 && Object.keys(teams).length===0){
        return (
            <div></div>
        )
    }

    const results = calculationMethod(games, teams)

    const renderTeamRanks = () => {
        const unorderedComponents =  Object.values(teams).map((t)=>{
            return {componentProps:{ teamId:t.id, rank:results[t.id], key:t.id}, rank: results[t.id]}
        })
        const orderedComponents = mergeSortComponents(unorderedComponents)
        let level = 0
        return orderedComponents.map((c)=>{
            level++
            return <TeamRank {...c.componentProps} place={level}/>
        })
    }
    return (
        <FlexResults>
            {renderTeamRanks()}
        </FlexResults>
    )
}

const ResultsPage = ({title, calculationMethod, weightCalculationMethod}) => {

    return (
        <ContentWrapper>
            <TitleWrap title={title}/>
            <ResultsSection calculationMethod={calculationMethod}/>
            <TitleWrap title={`Weighted ${title}`}/>
            <ResultsSection calculationMethod={weightCalculationMethod}/>
        </ContentWrapper>
    )
}

export default ResultsPage