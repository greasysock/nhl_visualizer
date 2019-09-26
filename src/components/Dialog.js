import React from 'react'

const Dialog = ({title}) => {
    return (
        <div style={{
            position: 'fixed',
            display: 'flex',
            width: '100%',
            height: '100vh',
            flexDirection: 'column',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div
                style={{
                    fontSize: '4vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70vw',
                    height: '20vh',
                    borderRadius: '20px',
                    borderStyle: 'solid'
                }}
            >
            {title}
            </div>
        </div>
    )
}

export default Dialog