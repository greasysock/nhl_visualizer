import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useTransition, animated, useSpring } from 'react-spring'
import {setPageAmount, setPage, fetchGames, fetchTeams} from '../actions'

import TeamsGraph from './TeamsGraph'
import TeamsSelection from './TeamsSelection'
import TeamsResults from './TeamsResults'
import usePrevious from '../hooks/usePrevious'

const pageWrap = Component => {
    return ({style}) => <animated.div style={style}><Component/></animated.div>
}

const pages = [
    pageWrap(TeamsSelection),
    pageWrap(TeamsGraph),
    pageWrap(TeamsResults)
]

const ScrollCircle = ({page=0}) =>{
    const dispatch = useDispatch()
    const currentPage = useSelector(s=>s.pagesConfig.currentPage)
    const active = currentPage === page
    const [props, set, stop] = useSpring(() => ({opacity: 1}))

    set({opacity: active ? 1 : .2})
    stop()

    return (
        <animated.div 
            style={{...props,
                width: '1.2vh', 
                height: '1.2vh', 
                backgroundColor: 'rgb(173,173,173)', 
                borderRadius: '50%',
                marginBottom: '.5vh'}}
            onClick={()=>{dispatch(setPage(page))}}
        />
    )
}

const ScrollNavigation = () => {
    const totalPages = useSelector(state=>state.pagesConfig.totalPages)
    const renderScrollCircles = () => {
        return Array(totalPages).fill().map((_, i) => <ScrollCircle page={i} key={i}/>)
    }
    return (
        <div style={{
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '1vw',
            height: '100vh',
            zIndex: '100'
        }}>
            {renderScrollCircles()}
        </div>
    )
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
    },[dispatch])
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
        </div>
    )
}

export default RootTransition