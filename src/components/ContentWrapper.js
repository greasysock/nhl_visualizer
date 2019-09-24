import React from 'react'

const ContentWrapper = ({children, style}) => {
    return (
        <div
        style={{...style,
            display: 'flex',
            justifyContent: 'space-evenly'
        }}
    >
        <div
            style={{
                flex: 1
            }}
        />
        <div
            style={{
                flex: 10
            }}
        >
            {children}
        </div>
    </div>
    )
}

export default ContentWrapper