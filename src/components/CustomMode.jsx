import { useState } from 'react'

function CustomMode({ onBack }) {
    const [roster, setRoster] = useState([])

    const [positions, setPositions] = useState({
        QB: 1,
        RB: 2,
        WR: 3,
        TE: 2,
        OL: 5,
        DL: 4,
        LB: 3,
        DB: 5,
        K: 1,
        P: 1
    })

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
        <div style={{ textAlign: 'center', marginTop: '20px'}}>
            <button
                onClick={onBack}
                style={{marginBottom: '20px', padding: '10px 20px'}}
            >
                Back to Main Menu
            </button>

            <h2>Custom Mode: Build Your Roster</h2>

            {/* Position selection */}
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

            {/* Player Selection (optional) */}
            <h3>Available Players:</h3>
            <ul>
                {allPlayers.map((player) => (
                    <li key={player.id}>
                        {player.name} ({player.position}){' '}
                        <button onClick={() => addPlayer(player)}>Add to Roster</button>
                    </li>
                ))}
            </ul>

            {/* Roster visual / formation */}
            <h3>Team Formation</h3>
            <div
                style={{
                    display: 'grid',
                    gridTemplateRows: 'repeat(7, 50px)',
                    gridTemplateColumns: 'repeat(11, 50px)',
                    gap: '5px',
                    justifyContent: 'center',
                    marginTop: '20px'
                }}
            >
                {/* Example: Offensive Line */}
                {Array(positions.OL).fill(0).map((_, i) => (
                    <div
                        key={'OL' + i}
                        style={{
                            backgroundColor: '#ccc',
                            border: '1px solid #333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                       OL
                    </div>
                ))}

                {/* RBs */}
                {Array(positions.RB).fill(0).map((_, i) => (
                    <div
                        key={'RB' + i}
                        style={{
                            backgroundColor: '#f88',
                            border: '1px solid #333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                       RB
                    </div>
                ))}

                {/* QBs */}
                {Array(positions.QB).fill(0).map((_, i) => (
                    <div
                        key={'QB' + i}
                        style={{
                            backgroundColor: '#f44',
                            border: '1px solid #333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                       QB
                    </div>
                ))}
            </div>

            {/* Optional: show full roster list */}
            <h3>Your Roster:</h3>
            <ul>
                {roster.map((player, index) => (
                <li key={index}>
                    {player.name} ({player.position})
                </li>
                ))}
            </ul>
        </div>
    )
}

export default CustomMode
