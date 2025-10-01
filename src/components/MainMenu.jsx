// MainMenu.jsx
function MainMenu({ onSelectMode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h1>Welcome to ProGM</h1>
      <p>Select a mode to start building your team:</p>

      <button onClick={() => onSelectMode("salaryCap")}>Salary Cap Mode</button>
      <button onClick={() => onSelectMode("draft")}>Draft Mode</button>
      <button onClick={() => onSelectMode("custom")}>Custom Mode</button>
    </div>
  );
}

export default MainMenu;
