
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

export const mergeSortComponents = (array=[]) => {
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

export const nullWeight = (value=0) => {return 1}

const NHL_SEASON_START = "2018-10-03"
const NHL_SEASON_END = "2019-06-12"
export const dateWeight = (date) => {
    const seasonStart = new Date(NHL_SEASON_START).getTime()
    const seasonEnd = new Date(NHL_SEASON_END).getTime()
    const seasonDuration = seasonEnd - seasonStart
    const elapsedTime = date.getTime() - seasonStart
    const gameWeight = (elapsedTime/seasonDuration) + .5
    if(gameWeight>1){return 1}

    return gameWeight
}


export * from './masseyMethod'
export * from './colleyMethod'