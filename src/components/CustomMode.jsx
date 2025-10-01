import { useState } from 'react'

function PlayerCard({ player }) {
    reutnr (
        <div className="player-card">
            <h4>{player.name}</h4>
            <p>{player.num}</p>
            <p>{player.position}</p>
            <p>Rating: {player.rating ?? "N/A"}</p>
        </div>
    );
}

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
    });

    const [step, setStep] = useState(1)

    const totalPlayers = Object.values(positions).reduce((a, b) => a + b, 0)

    const handleChange = (pos, value) => {
        setPositions({
            ...positions,
            [pos]: Number(value)
        });
    };

    const allPlayers = [
        {id: 1, name: "Patrick Mahomes", num: "15", position: "QB", rating: 97},
        {id: 2, name: "Derrick Henry", num: "22", position: "RB", rating: 95},
        {id: 3, name: "Davante Adams", num: "17", position: "WR", rating: 90},
        {id: 4, name: "Travis Kelce", num: "87", position: "TE", rating: 87},
        {id: 5, name: "Jalen Ramsey", num: "5", position: "CB", rating: 89},
        {id: 6, name: "Minkah Fitzpatrick", num: "29", position: "S", rating: 86},
    ];

    const formationSlots = [];
    Object.keys(positions).forEach((pos) => {
        for (let i = 1; i <= positions[pos]; i++) {
            formationSlots.push({ id: `${pos}${i}`, position: pos});
        }
    });

    const [selectedPlayers, setSelectedPlayers] = useState(
        formationSlots.reduce((acc, slot) => {
            acc[slot.id] = null;
            return acc;
        }, {})
    );

    const [activeSlot, setActiveSlot] = useState(null);

    const selectPlayer = (player) => {
        if (!activeSlot) return;
        setSelectedPlayers((prev) => ({
            ...prev,
            [activeSlot]: player
        }));
        setActiveSlot(null);
    };

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

                    <div className="field">
                        {formationSlots.map((slot) => (
                            <div
                                key={slot.id}
                                className="slot"
                                onClick={() => setActiveSlot(slot.id)}
                            >
                                {selectedPlayers[slot.id] ? (
                                    <PlayerCard player={selectedPlayers[slot.id]} />
                                ) : (
                                    <span>{slot.position}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Player selection modal */}
                    {activeSlot && (
                        <div
                            style={{
                                marginTop: "20px",
                                border: "1px #333",
                                padding: "10px",
                                borderRadius: "8px",
                                backgroundColor: "#1a1a1a",
                                color: "#fff"
                            }}
                        >
                            <h3>
                                Select a{" "}
                                {formationSlots.find((s) => s.id === activeSlot).position}
                            </h3>
                            {allPlayers
                                .filter(
                                    (p) =>
                                        p.position ===
                                        formationSlots.find((s) => s.id === activeSlot).position
                                )
                                .map((player) => (
                                    <button
                                        key={player.id}
                                        onClick={() => selectPlayer(player)}
                                        style = {{ display: "block", margin: "5px auto"}}
                                    >
                                        {player.name} (Rating: {player.rating})
                                    </button>
                                ))}
                            <button
                                onClick={() => selectPlayer(player)}
                                style={{ disply: "block", margin: "10px auto"}}
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    <h3>Your Roster:</h3>
                    <ul>
                        {Object.values(selectedPlayers).map(
                            (player, index) =>
                                player && (
                                    <li key={index}>
                                        {player.name} ({player.position})
                                    </li>
                                )
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

export default CustomMode
