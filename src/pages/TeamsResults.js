import React from 'react'
import {transpose, multiply} from 'mathjs'
import rref from 'rref'
import useTeams from '../hooks/useTeams'
import useTeam from '../hooks/useTeam'
import useGames from '../hooks/useGames'
import {nhlLogoPath} from '../helpers'

const mapGameDataToMatrix = (games, teams) => {
    //Declare index map for team
    const teamsIndexMap = {}

    let i = 0
    Object.values(teams).forEach(t=>{
        teamsIndexMap[t.id] = i
        i++
    })

    /*
      Map game data to matrix. games.map returns array of arrays => [[0,1,-1],[1,0,-1],[-1,1,0]]
      Each item in the first array represents the outcome for each game.
      Also creates gamesScore matrix => [[12],[3],[8]]
    */
    const gamesScore = []
    let j = 0
    const gameResultMatrix = games.map(game=>{
        const gameOutcome = Array(i).fill(0)
        gamesScore[j] = [game.difference]
        gameOutcome[teamsIndexMap[game.winnerTeamId]] = 1
        gameOutcome[teamsIndexMap[game.loserTeamId]] = -1
        j++
        return gameOutcome
    })

    return {outcome: gameResultMatrix, score: gamesScore, length: i, teamsIndexMap}
}

// A=[a,b,c] B=[d] resultant= [a,b,c,d]
const addMatrixToEndMatrix = (A=[], B=[]) => {
    const resultant = []
    for(let i = 0; i<A.length; i++){
        const rowA = A[i]
        const rowB = B[i]

        resultant.push(rowA.concat(rowB))
    }
    return resultant
}

// Adds [ 1, 1, 1, ... , 0 ] to final row to force solve. a + b + c + d + ... = 0
const makeSolve = (A=[]) => {
    const rowLength = A[0].length
    const lastRow = Array(rowLength).fill(1)
    lastRow[rowLength-1] = 0
    A[A.length-1] = lastRow
    return A
}

// Adds matrix B to after the final column in matrix A. Replaces final row to force solve. Solves with rref and pulls results outs.
const rrefAndPullResults = (A=[], B=[])=>{
    const resultsMatrix = rref(makeSolve(addMatrixToEndMatrix(A,B)))
    return resultsMatrix.map((r)=>{
        return r.slice(-1)[0]
    })
}

const processWithMasseyMethod = (games, teams) => {
    const {outcome, score, teamsIndexMap} = mapGameDataToMatrix(games, teams)
    const outcomeT = transpose(outcome)
    const lsOutcome = multiply(outcomeT, outcome)
    const lsScore = multiply(outcomeT, score)

    // Map results to team object
    const teamResults = {}
    const results = rrefAndPullResults(lsOutcome, lsScore)
    Object.values(teams).forEach((t)=>{
        teamResults[t.id] = results[teamsIndexMap[t.id]]
    })
    return teamResults
}

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

const TeamRank = ({teamId, rank}) => {
    const {team} = useTeam(teamId)
    
    return (
        <div
        style = {{
            width: '10vw',
            height: '10vw',
            margin: '5vw'
        }}
        >
            <img style={{width: '10vw', height: '10vw'}} src={nhlLogoPath(teamId)}/>
            {team.name}
            <div>{rank}</div>
        </div>
    )

}

const TeamsResults = () => {
    const games = useGames()
    const teams = useTeams()
    const masseyResults = processWithMasseyMethod(games, teams)

    const renderTeamRanks = () => {
        
        const unorderedComponents =  Object.values(teams).map((t)=>{
            return {component:<TeamRank teamId={t.id} rank={masseyResults[t.id]} key={t.id}/>, rank: masseyResults[t.id]}
        })
        const orderedComponents = mergeSortComponents(unorderedComponents)
        return orderedComponents.map((c)=>c.component)
    }

    return (
        <div>
            Massey's Method
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly'
                }}
            >
            {renderTeamRanks()}
            </div>
        </div>
    )
}

export default TeamsResults