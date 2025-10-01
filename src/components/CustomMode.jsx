import { useState } from 'react'

function CustomMode({ onBack }) {
    const [roster, setRoster] = useState([])

    const [positions, setPositions] = useState({
        QB: 3, 
        RB: 4,
        FB: 1,
        WR: 6,
        TE: 3,
        OL: 10,
        DL: 7,
        LB: 7,
        CB: 5,
        S: 4,
        K: 1,
        P: 1,
        LS: 1
    })

    const [step, setStep] = useState(1)

    const totalPlayers = Object.values(positions).reduce((a, b) => a + b, 0)

    const handleChange = (pos, value) => {
        setPositions({
            ...positions,
            [pos]: Number(value)
        })
    }

    const allPlayers = [
        {id: 1, name: 'Patrick Mahomes', position: 'QB'},
        {id: 2, name: 'Derrick Henry', position: 'RB'},
        {id: 3, name: 'Davante Adams', position: 'WR'},
        {id: 4, name: 'Travis Kelce', position: 'TE'}
    ]

    const addPlayer = (player) => {
        setRoster([...roster, player])
    }

    return (
        <div 
            style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center'
            }}
        >
            <button
                onClick={onBack}
                style={{marginBottom: '20px', padding: '10px 20px'}}
            >
                Back to Main Menu
            </button>
            
            {step === 1  && (
                <>
                    <h2>Set Your Roster Numbers</h2>
                    <h3>Select how many players for each position (53 total):</h3>
                    {Object.keys(positions).map((pos) => (
                        <div key={pos} style={{margin: '5px'}}>
                            <label>{pos}: </label>
                            <input
                                type="number"
                                min="0"
                                value={positions[pos]}
                                onChange={(e) => handleChange(pos, e.target.value)}
                                style={{ width: '50px'}}
                            />
                        </div>
                ))}
                <p>Total players: {totalPlayers}</p>

                <button
                    disabled={totalPlayers !== 53}
                    onClick={() => setStep(2)}
                    style={{
                        padding: '10px 20px',
                        marginTop: '10px',
                        backgroundColor: totalPlayers === 53 ? '#4CAF50' : '#aaa',
                        color: 'white',
                        cursor: totalPlayers === 53 ? 'pointer' : 'not-allowed'
                    }}
                >
                    Continue
                </button>
            </>
        )}
            

        {step === 2 && (
                <>
                    <h2>Build Your Team</h2>

                    {/* Player Selection */}
                    <h3>Available Players:</h3>
                    <ul>
                        {allPlayers.map((player) => (
                            <li key={player.id}>
                                {player.name} ({player.position}){' '}
                                <button onClick={() => addPlayer(player)}>Add to Roster</button>
                            </li>
                        ))}
                    </ul>

                    {/* Roster Display */}
                    <h3>Your Roster:</h3>
                    <ul>
                        {roster.map((player, index) => (
                        <li key={index}>
                            {player.name} ({player.position})
                        </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default CustomMode
