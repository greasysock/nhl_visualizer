import React from 'react'
import Graph from 'react-graph-vis'
import Dialog from '../components/Dialog'
import useTeams from '../hooks/useTeams'
import useGames from '../hooks/useGames'
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
    return gameLinks.map((game)=>{
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
    const games = useGames()
    const nodes = renderNodes(Object.values(teams))
    const edges = renderEdges(games, teams)
    if(Object.keys(teams).length > 10){
        return (
            <Dialog title='Too many teams selected to visualize'/>
        )
    }
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