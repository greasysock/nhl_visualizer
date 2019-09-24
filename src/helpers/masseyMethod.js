import {transpose, multiply} from 'mathjs'
import {addMatrixToEndMatrix, pullLastColumn, mapResultsBackToTeams} from '../helpers'
import rref from 'rref'

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
    return pullLastColumn(resultsMatrix)
}

export const masseyMethod = (games, teams) => {
    const {outcome, score, teamsIndexMap} = mapGameDataToMatrix(games, teams)
    const outcomeT = transpose(outcome)
    const lsOutcome = multiply(outcomeT, outcome)
    const lsScore = multiply(outcomeT, score)

    // Map results to team object
    const results = rrefAndPullResults(lsOutcome, lsScore)
    const teamResults = mapResultsBackToTeams(teams, results, teamsIndexMap)
    return teamResults
}

export const weightedMasseyMethod = (games, teams) => {
    return {}
}