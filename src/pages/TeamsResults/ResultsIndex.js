import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import ResultsPage from './ResultsPage'
import {colleyMethod, masseyMethod, weightedColleyMethod, weightedMasseyMethod} from '../../helpers'


const pageWrap = component => {
    return ({style}) => <animated.div style={style}>{component}</animated.div>
}
const pages = [
    pageWrap(<ResultsPage title="Massey's Method" calculationMethod={masseyMethod} weightCalculationMethod={weightedMasseyMethod}/>),
    pageWrap(<ResultsPage title="Colley's Method" calculationMethod={colleyMethod} weightCalculationMethod={weightedColleyMethod}/>)
]

const ResultsIndex = () => {
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % pages.length), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  return (
    <div className="simple-trans-main" onClick={onClick}>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
    </div>
  )
}

export default ResultsIndex
