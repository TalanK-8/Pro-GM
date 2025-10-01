// App.jsx
import { useState } from "react";
import MainMenu from "./components/MainMenu";
import CustomMode from "./components/CustomMode";

function App() {
  const [mode, setMode] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // vertical center
        alignItems: "center",     // horizontal center
        height: "100vh",
        width: "100vw",           // make sure full width too
        textAlign: "center",
      }}
    >
      {!mode && <MainMenu onSelectMode={setMode} />}
      {mode === "custom" && <CustomMode onBack={() => setMode(null)} />}
      {mode === "salaryCap" && (
        <div>
          <button onClick={() => setMode(null)}>Back</button>
          <h2>Salary Cap Mode</h2>
        </div>
      )}
      {mode === "draft" && (
        <div>
          <button onClick={() => setMode(null)}>Back</button>
          <h2>Draft Mode</h2>
        </div>
      )}
    </div>
  );
}

export default App;
