import { useState } from 'react'
import MainMenu from './components/MainMenu'
import CustomMode from './components/CustomMode'

function App() {
  const [mode, setMode] = useState(null)

  if (!mode) {
    return <MainMenu onSelectMode={setMode} />
  }

  if (mode === 'salaryCap') {
    return (
      <div>
        <button
          onClick={() => setMode(null)}
          style={{ margin: '20px', padding: '10px 20px'}}
        >
          Back to Main Menu
        </button>
        <h2>Salary Cap Mode (coming soon!)</h2>
      </div>
    )
  }

  if (mode === 'draft') {
    return (
      <div>
        <button
          onClick={() => setMode(null)}
          style={{ margin: '20px', padding: '10px 20px'}}
        >
          Back to Main Menu
        </button>
        <h2>Draft Mode (coming soon!)</h2>
      </div>
    )
  }

  if (mode === 'custom') {
    return <CustomMode onBack={() => setMode(null)} />
  }

  return null
}

export default App
