import React, { useState, useEffect } from "react";
import { BsFlag } from "react-icons/bs";
import axios from "axios";
import "../index"; // Assuming the CSS file is named "FlagIcon.css"

const FlagIcon = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [flagName, setFlagName] = useState("");

  const colors = [
    { name: "Red", color: "#FF0000" },
    { name: "Blue", color: "#0000FF" },
    { name: "Green", color: "#008000" },
    { name: "Yellow", color: "#FFFF00" },
    { name: "Purple", color: "#800080" },
    { name: "Orange", color: "#FFA500" },
    { name: "Pink", color: "#FFC0CB" },
  ];

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleSaveFlag = async () => {
    try {
      // Make an API call to save the flag entity to the backend
      const response = await axios.post(
        "http://localhost:3000/api/v1/priorities",
        {
          name: flagName,
          color: selectedColor,
        }
      );

      console.log("Response from server:", response.data);

      // You may want to trigger a refresh of your data or update the UI here
    } catch (error) {
      console.error("Error saving flag:", error);
    }
  };

  useEffect(() => {
    // You can add any additional logic here when the selectedColor or flagName changes
  }, [selectedColor, flagName]);

  return (
    <div className="flag-icon-container">
      <BsFlag onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown && (
        <div className="flag-dropdown">
          <div>
            {colors.map((color) => (
              <div
                key={color.name}
                className={`color-option ${
                  selectedColor === color.name ? "selected" : ""
                }`}
                style={{ backgroundColor: color.color }}
                onClick={() => handleColorSelection(color.name)}
              ></div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Enter flag name"
            value={flagName}
            onChange={(e) => setFlagName(e.target.value)}
          />
          <button onClick={handleSaveFlag}>Save Flag</button>
        </div>
      )}
    </div>
  );
};

export default FlagIcon;
