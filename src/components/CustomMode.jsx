import React, { useState } from "react";
import "./CustomMode.css";

const formations = {
  offense: [
    { id: "QB", type: "QB", top: "70%", left: "45%" },
    { id: "RB", type: "RB", top: "60%", left: "45%" },
    { id: "FB", type: "FB", top: "65%", left: "55%" },
    { id: "WR1", type: "WR", top: "50%", left: "10%" },
    { id: "WR2", type: "WR", top: "50%", left: "80%" },
    { id: "SWR", type: "WR", top: "55%", left: "65%" },
    { id: "TE", type: "TE", top: "55%", left: "30%" },
    { id: "LT", type: "OL", top: "40%", left: "25%" },
    { id: "LG", type: "OL", top: "40%", left: "35%" },
    { id: "C", type: "OL", top: "40%", left: "45%" },
    { id: "RG", type: "OL", top: "40%", left: "55%" },
    { id: "RT", type: "OL", top: "40%", left: "65%" },
  ],
  defense: [
    { id: "DL1", type: "DL", top: "40%", left: "25%" },
    { id: "DL2", type: "DL", top: "40%", left: "40%" },
    { id: "DL3", type: "DL", top: "40%", left: "55%" },
    { id: "DL4", type: "DL", top: "40%", left: "70%" },
    { id: "LB1", type: "LB", top: "55%", left: "35%" },
    { id: "LB2", type: "LB", top: "55%", left: "50%" },
    { id: "LB3", type: "LB", top: "55%", left: "65%" },
    { id: "CB1", type: "CB", top: "65%", left: "15%" },
    { id: "CB2", type: "CB", top: "65%", left: "80%" },
    { id: "S1", type: "S", top: "75%", left: "35%" },
    { id: "S2", type: "S", top: "75%", left: "65%" },
  ],
  special: [
    { id: "K", type: "K", top: "60%", left: "45%" },
    { id: "P", type: "P", top: "70%", left: "55%" },
    { id: "LS", type: "LS", top: "65%", left: "35%" },
  ],
};

// Simple player list for testing
const availablePlayers = {
  QB: [{ id: 1, name: "Patrick Mahomes" }, { id: 2, name: "Josh Allen" }],
  RB: [{ id: 3, name: "Derrick Henry" }, { id: 4, name: "Christian McCaffrey" }],
  FB: [{ id: 5, name: "Kyle Juszczyk" }],
  WR: [
    { id: 6, name: "Davante Adams" },
    { id: 7, name: "Tyreek Hill" },
    { id: 8, name: "Stefon Diggs" },
  ],
  TE: [{ id: 9, name: "Travis Kelce" }, { id: 10, name: "Mark Andrews" }],
  OL: [{ id: 11, name: "Trent Williams" }, { id: 12, name: "David Bakhtiari" }],
  DL: [{ id: 13, name: "Aaron Donald" }, { id: 14, name: "Myles Garrett" }],
  LB: [{ id: 15, name: "Fred Warner" }, { id: 16, name: "Darius Leonard" }],
  CB: [{ id: 17, name: "Jalen Ramsey" }, { id: 18, name: "Jaire Alexander" }],
  S: [{ id: 19, name: "Minkah Fitzpatrick" }, { id: 20, name: "Derwin James" }],
  K: [{ id: 21, name: "Justin Tucker" }],
  P: [{ id: 22, name: "Johnny Hekker" }],
  LS: [{ id: 23, name: "Josh Harris" }],
};

const CustomMode = () => {
  const [activeTab, setActiveTab] = useState("offense");
  const [assigned, setAssigned] = useState({});
  const [modalSlot, setModalSlot] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSlotClick = (slot) => {
    setModalSlot(slot);
    setSelectedPlayer(assigned[slot.id] || null);
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  const handleBack = () => {
    if (modalSlot && selectedPlayer) {
      setAssigned((prev) => ({
        ...prev,
        [modalSlot.id]: selectedPlayer,
      }));
    }
    setModalSlot(null);
    setSelectedPlayer(null);
  };

  // Filter available players to prevent duplicates
  const getFilteredPlayers = (type) => {
    const usedIds = Object.values(assigned).map((p) => p?.id);
    return availablePlayers[type]?.filter((p) => !usedIds.includes(p.id)) || [];
  };

  return (
    <div className="custom-mode">
      {/* Tabs */}
      <div className="tabs">
        {["offense", "defense", "special"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Field */}
      {!modalSlot && (
        <div className="field">
          {formations[activeTab].map((slot) => (
            <div
              key={slot.id}
              className="slot"
              style={{ top: slot.top, left: slot.left }}
              onClick={() => handleSlotClick(slot)}
            >
              {assigned[slot.id]?.name || slot.type}
            </div>
          ))}
        </div>
      )}

      {/* Player Selection Screen */}
      {modalSlot && (
        <div className="selection-screen">
          <div className="selected-slot">
            <h2>{modalSlot.type}</h2>
            <div className="player-slot-big">
              {selectedPlayer ? selectedPlayer.name : "Empty"}
            </div>
          </div>
          <div className="player-scroll">
            {getFilteredPlayers(modalSlot.type).map((player) => (
              <div
                key={player.id}
                className={`player-card ${
                  selectedPlayer?.id === player.id ? "selected" : ""
                }`}
                onClick={() => handlePlayerSelect(player)}
              >
                {player.name}
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomMode;