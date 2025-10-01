function MainMenu({ onSelectMode }) {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px'}}>
            <h1>Welcome to Shadow NFL Team Builder</h1>
            <p>Select a mode to start building your team:</p>

            <div style={{ marginTop: '30px'}}>
                <button
                    style={{ marginRight: '10px', padding: '10px 20px'}}
                    onClick={() => onSelectMode('salaryCap')}
                >
                    Salary Cap Mode
                </button>

                <button
                    style={{marginRight: '10px', padding: '10px 20px'}}
                    onClick={() => onSelectMode('draft')}
                >
                    Draft Mode
                </button>

                <button
                    style={{ padding: '10px 20px'}}
                    onClick={() => onSelectMode('custom')}
                >
                    Custom Mode
                </button>
            </div>
        </div>
    )
}

export default MainMenu