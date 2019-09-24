
export const nhlLogoPath = teamId => {
    const teamLogoPath = `https://www-league.nhlstatic.com/nhl.com/builds/site-core/7857f6401166da0bf6ac1063d09f8bacc7d17617_1565290324/images/logos/team/current/team-${teamId}-dark.svg`
    return teamLogoPath
}

// A=[a,b,c] B=[d] resultant= [a,b,c,d]
export const addMatrixToEndMatrix = (A=[], B=[]) => {
    const resultant = []
    let length = A.length

    if(!length){
        length = A.size()[0]
    }
    for(let i = 0; i<length; i++){
        const rowA = A[i]
        const rowB = B[i]

        resultant.push(rowA.concat(rowB))
    }
    return resultant
}

export const pullLastColumn = (A) => {
    return A.map((r)=>{
        return r.slice(-1)[0]
    })
}

export const mapResultsBackToTeams = (teams, results, teamsIndexMap) => {
    const teamResults = {} 
    Object.values(teams).forEach((t)=>{
        teamResults[t.id] = results[teamsIndexMap[t.id]]
    })
    return teamResults
}

export * from './masseyMethod'
export * from './colleyMethod'