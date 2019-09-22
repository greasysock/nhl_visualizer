import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useSpring, animated} from 'react-spring'
import {setPage} from '../actions'

const ScrollCircle = ({page=0}) =>{
    const dispatch = useDispatch()
    const {currentPage, pageNames} = useSelector(s=>s.pagesConfig)
    const active = currentPage === page
    const [props, set, stop] = useSpring(() => ({opacity: 1}))

    set({opacity: active ? 1 : .2})
    stop()

    return (
        <animated.div 
            style={{...props,
                width: '1.2vh', 
                height: '1.2vh', 
                backgroundColor: 'rgb(100,100,100)', 
                borderRadius: '50%',
                marginBottom: '.7vh'}}
            onClick={()=>{dispatch(setPage(page))}}>
            <div
                style={{
                    width: '10vw',
                    position: "relative",
                    left: '1vw',
                    fontSize: '1vw',
                    bottom: '.1vh',
                    color: 'rgb(100,100,100)'
                }}
            >
            {pageNames[page]}
            </div>
        </animated.div>
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

export default ScrollNavigation