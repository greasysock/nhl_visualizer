import React from 'react'

const FlexResults = ({children}) => {
    return (
        <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '100%',
        }}
    >
    {children}
    </div>
    )
}

export default FlexResults