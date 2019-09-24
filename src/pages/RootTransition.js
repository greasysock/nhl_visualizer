import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useTransition, animated } from 'react-spring'
import {setPageAmount, fetchGames, fetchTeams, setPageName} from '../actions'
import ScrollNavigation from '../components/ScrollNavigation'
import SelectionCounter from '../components/SelectionCounter'

import TeamsGraph from './TeamsGraph'
import TeamsSelection from './TeamsSelection'
import ResultsIndex from './TeamsResults/ResultsIndex'
import usePrevious from '../hooks/usePrevious'

const pageWrap = Component => {
    return ({style}) => <animated.div style={style}><Component/></animated.div>
}

const pages = [
    pageWrap(TeamsSelection),
    pageWrap(TeamsGraph),
    pageWrap(ResultsIndex)
]

const pageNames = [
    'CHOOSE TEAMS',
    'GRAPH',
    'RESULTS'
]

const setupPageNames = dispatch => {
    for(let i = 0; i<pageNames.length; i++){
        dispatch(setPageName(pageNames[i], i))
    }
}

const RootTransition = () => {
    const currentPage = useSelector(state=>state.pagesConfig.currentPage)
    const dispatch = useDispatch()
    const lastCurrentPage = usePrevious(currentPage)
    const [flowDirection, setFlowDirection] = useState(1)
    useEffect(()=>{
        dispatch(setPageAmount(pages.length))
        dispatch(fetchTeams())
        dispatch(fetchGames())
        setupPageNames(dispatch)
    },[dispatch, setupPageNames])
    useEffect(()=>{
        if(currentPage > lastCurrentPage){
            setFlowDirection(-1)
            return
        }
        setFlowDirection(1)
    },[currentPage,lastCurrentPage])
    const transitions = useTransition(currentPage, p => p, {
        from: { opacity: 0, transform: `translate3d(0,${-1*flowDirection}00%,0)` },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: `translate3d(0,${flowDirection}00%,0)` },
      })

    return (
        <div>
            <ScrollNavigation/>
            {transitions.map(({ item, props, key }) => {
                const Page = pages[item]
                return <Page key={key} style={props} />
            })}
            <SelectionCounter/>
        </div>
    )
}

export default RootTransition