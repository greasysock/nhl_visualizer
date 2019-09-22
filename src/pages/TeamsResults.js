import React from 'react'
import {transpose, multiply} from 'mathjs'
import rref from 'rref'
import useTeams from '../hooks/useTeams'
import useGames from '../hooks/useGames'

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

// Adds [ 1, 1, 1, ... , 0 ] to final row to force solve
const makeSolve = (A=[]) => {
    const rowLength = A[0].length
    const lastRow = Array(rowLength).fill(1)
    lastRow[rowLength-1] = 0
    A[A.length-1] = lastRow
    return A
}

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

const TeamsResults = () => {
    const games = useGames()
    const teams = useTeams()
    const masseyResults = processWithMasseyMethod(games, teams)
    console.log(masseyResults)
    return (
        <div>Results</div>
    )
}

export default TeamsResults