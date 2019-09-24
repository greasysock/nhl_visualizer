import React from 'react'

const TitleWrap = ({title}) => {
    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            top: '3vh'
        }}>
            <div
                style={{
                    flex: 1,
                    fontSize: '4vh'
                }}
            >
            {title}
            </div>
        </div>
    )
}

export default TitleWrap