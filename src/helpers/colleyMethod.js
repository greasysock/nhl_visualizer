
import {identity, add, multiply} from 'mathjs'
import rref from 'rref'
import {addMatrixToEndMatrix, pullLastColumn, mapResultsBackToTeams, nullWeight, dateWeight} from '../helpers'

const initArrayAndRatioMap = (teams) => {
    const teamLength = Object.keys(teams).length
    const valueMatrix =  []
    const ratioMap = []
    for(let i = 0; i< teamLength; i++){
        valueMatrix.push(Array(teamLength).fill(-1))
        ratioMap.push({ win: 0, lose: 0})
    }
    return {valueMatrix, ratioMap}
}

/*
Iterate over Games and map total games played + 2 to team and -1 for non-playing team. (Number of games played+2)*I

[[3,-1,-1,-1], [-1,5,-1,-1], [-1,-1,-1]]
*/

const mapGameDataToMatrix = (games, teams, weightMethod=nullWeight) => {
    //Declare index map for team
    const teamsIndexMap = {}

    let i = 0
    Object.values(teams).forEach(t=>{
        teamsIndexMap[t.id] = i
        i++
    })

    const {valueMatrix, ratioMap} = initArrayAndRatioMap(teams)
    const addOneAtTeamId = (teamId, game) => {
        const index = teamsIndexMap[teamId]
        valueMatrix[index][index] += weightMethod(game.gameDate)
    }
    const addWinToMap = (teamId, game) => {
        const index = teamsIndexMap[teamId]
        ratioMap[index].win += weightMethod(game.gameDate)
    }
    const addLoseToMap = (teamId, game) => {
        const index = teamsIndexMap[teamId]
        ratioMap[index].lose += weightMethod(game.gameDate)
    }

    // Takes win loss ratio and creates matrix of n length
    const createFinalRatioMatrix = () => {
        return ratioMap.map( teamData =>{
            return [1+(teamData.win-teamData.lose)/2]
        } )
    }

    games.forEach(game=>{
        addOneAtTeamId(game.winnerTeamId, game)
        addOneAtTeamId(game.loserTeamId, game)
        addWinToMap(game.winnerTeamId, game)
        addLoseToMap(game.loserTeamId, game)
    })
    const identityMatrix = multiply(identity(valueMatrix.length), 3)
    const finalTotalMatrix = add(valueMatrix, identityMatrix)
    const finalRatioMatrix = createFinalRatioMatrix()

    return {finalTotalMatrix, finalRatioMatrix, teamsIndexMap}
}
export const colleyMethod = (games, teams, weightMethod=nullWeight) => {
    const {finalRatioMatrix, finalTotalMatrix, teamsIndexMap} = mapGameDataToMatrix(games, teams, weightMethod)
    const combinedMatrix = addMatrixToEndMatrix(finalTotalMatrix.toArray(), finalRatioMatrix)
    const resultsMatrix = rref(combinedMatrix)
    const results = pullLastColumn(resultsMatrix)
    const teamsResults = mapResultsBackToTeams(teams, results, teamsIndexMap)
    return teamsResults
}

export const weightedColleyMethod = (games, teams) => {
    return colleyMethod(games, teams, dateWeight )
}