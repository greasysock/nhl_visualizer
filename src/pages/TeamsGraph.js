import React from 'react'
import {useSelector} from 'react-redux'
import Graph from 'react-graph-vis'
import useTeams from '../hooks/useTeams'
import {nhlLogoPath} from '../helpers'
import './TeamsGraph.css'

const renderNodes = (teamNodes=[]) => {
    return teamNodes.map((team)=>{
        return (
            {
                id:team.id,
                image: nhlLogoPath(team.id),
                shape: 'image',
                size: 40
            }
        )
    })
}

const renderEdges = (gameLinks=[], teams={}) => {
    const filteredGames = gameLinks.filter((game)=>teams[game.winnerTeamId] && teams[game.loserTeamId])
    return filteredGames.map((game)=>{
        return{
            from:game.winnerTeamId,
            to:game.loserTeamId,
            label:`${game.difference}`
        }
        }
    )
}

const TeamsGraph = () => {
    const teams = useTeams()
    const games = useSelector(state=>state.games)
    const nodes = renderNodes(Object.values(teams))
    const edges = renderEdges(Object.values(games), teams)

    const graph = {
        nodes,edges
    }

    const options = {
        layout: {
            improvedLayout: true
        },
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        edges: {
            smooth: {
                type: 'dynamic',
                roundness: .6
            },
            font: {
                color: '#111',
                face: 'Josefin Sans',
                size: 16,
                strokeWidth: 1,
                strokeColor: '#222',
                align: 'bottom'
              },
            color: {
            color: '#CCC',
            highlight: '#A22'
            }
        },
        physics: {
            enabled: true,
            forceAtlas2Based: {
                avoidOverlap: .7,
                springLength: 400
            },
            solver: 'forceAtlas2Based'
        }
    }

    if(Object.keys(teams).length === 0 || Object.keys(games).length===0){
        return(
            <div>loading...</div>
        )
    }
    return (
            <Graph
                graph={graph}
                options={options}
            />
        )
}

export default TeamsGraph