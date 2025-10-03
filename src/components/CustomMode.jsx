import React, { useState } from "react";
import "./CustomMode.css";

const formations = {
  offense: [
    { id: "QB", type: "QB", top: "45%", left: "45%" },
    { id: "RB", type: "RB", top: "62%", left: "52%" },
    { id: "FB", type: "FB", top: "62%", left: "38%" },
    { id: "WR1", type: "WR", top: "10%", left: "2%" },
    { id: "WR2", type: "WR", top: "12%", left: "92%" },
    { id: "SWR", type: "WR", top: "15%", left: "14%" },
    { id: "TE", type: "TE", top: "15%", left: "75%" },
    { id: "LT", type: "LT", top: "20%", left: "25%" },
    { id: "LG", type: "LG", top: "15%", left: "35%" },
    { id: "C", type: "C", top: "10%", left: "45%" },
    { id: "RG", type: "RG", top: "15%", left: "55%" },
    { id: "RT", type: "RT", top: "20%", left: "65%" },
  ],
  defense: [
    { id: "DE1", type: "DE", top: "40%", left: "25%" },
    { id: "DT1", type: "DT", top: "40%", left: "40%" },
    { id: "DT2", type: "DT", top: "40%", left: "55%" },
    { id: "DE2", type: "DE", top: "40%", left: "70%" },
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

// Example players w/ images
const availablePlayers = {
  QB: [
    { id: 1, name: "Patrick Mahomes", jnum: 15, image: "/images/mahomes.png" },
    { id: 2, name: "Josh Allen", jnum: 17, image: "/images/allen.png" },
  ],
  WR: [
    { id: 3, name: "Justin Jefferson", jnum: 18, image: "/images/jefferson.png" },
    { id: 4, name: "Tyreek Hill", jnum: 10, image: "/images/hill.png" },
  ],
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

  // Prevent duplicate assignment
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
              {assigned[slot.id]?.image ? (
                <img
                  src={assigned[slot.id].image}
                  alt={assigned[slot.id].name}
                  style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                />
              ) : (
                slot.type
              )}
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
                <img
                  src={player.image}
                  alt={player.name}
                  className="player-img"
                />
                <div className="player-info">
                  <h3>{player.name}</h3>
                  <p>#{player.jnum}</p>
                </div>
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
