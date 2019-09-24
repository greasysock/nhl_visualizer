import React from 'react'
import useTeams from '../hooks/useTeams'

const SelectionCounter = () => {
    const teams = Object.values(useTeams())

    return (
        <div
            style={{
                display: 'flex',
                position: 'fixed',
                bottom: '10vh',
                justifyContent: 'center',
                width: '100vw'

            }
            }
        >
            <div
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    padding: 3,
                    backgroundColor: 'white',
                    borderRadius: '5px'
                }}    
            >
                {teams.length} teams selected
            </div>
        </div>
    )
}

export default SelectionCounter