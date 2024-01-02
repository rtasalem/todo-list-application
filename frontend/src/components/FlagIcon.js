// FlagIcon.js
import React, { useState, useEffect } from "react";
import { BsFlag } from "react-icons/bs";
import axios from "axios";
import "../index.css";
import setShowModal from "./Modal";

const DEFAULT_FLAG = { name: "Black", color: "#000000" };

const FlagIcon = ({
  taskId,
  initialColor,
  initialName,
  initialFlagId,
  onDeleteFlag,
  onSaveFlagSuccess,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    initialColor || DEFAULT_FLAG.color
  );
  const [flagName, setFlagName] = useState(initialName || "");
  const [localFlagId, setLocalFlagId] = useState(initialFlagId);

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
      let response;

      if (taskId && localFlagId) {
        // Update existing flag
        response = await axios.put(
          `http://localhost:8088/api/v1/priorities/${localFlagId}`,
          {
            name: flagName,
            color: selectedColor.color,
            TaskId: taskId,
          }
        );
        setLocalFlagId(response.data.id);
      } else {
        // Create a new flag
        response = await axios.post("http://localhost:8088/api/v1/priorities", {
          name: flagName,
          color: selectedColor.color,
          TaskId: taskId,
        });

        setLocalFlagId(response.data.id);
      }

      setSelectedColor({
        id: localFlagId,
        name: flagName,
        color: selectedColor.color,
      });

      console.log("Flag saved:", response.data);

      // Trigger the callback to update the entity
      onSaveFlagSuccess({
        flagId: localFlagId,
        flagName,
        flagColor: selectedColor,
      });

      setShowDropdown(false); // Close the dropdown after saving
    } catch (error) {
      console.error("Error saving/updating flag:", error);
    }
  };

  const closeDropdownOnOutsideClick = (e) => {
    if (!e.target.closest(".flag-icon-container")) {
      setShowDropdown(false);
    }
  };

  const handleDeleteFlag = async () => {
    try {
      if (localFlagId !== null) {
        const response = await axios.delete(
          `http://localhost:8088/api/v1/priorities/${localFlagId}`
        );
        console.log("Flag deleted:", response.data);
        console.log(taskId);
        setLocalFlagId(null);
        onDeleteFlag();
        setSelectedColor(DEFAULT_FLAG.color);
        setFlagName("");
      } else {
        console.warn("Cannot delete flag without an id.");
      }
    } catch (error) {
      console.error("Error deleting flag:", error);
    }
  };

  useEffect(() => {
    setSelectedColor({ name: "Custom", color: initialColor });
    setFlagName(initialName || "");

    document.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, [initialColor, initialName]);

  useEffect(() => {
    // Reset state after the flag is deleted or updated
    if (!initialFlagId) {
      setSelectedColor(DEFAULT_FLAG);
      setFlagName("");
      setLocalFlagId(null);
      setShowDropdown(false);
    }
  }, [initialFlagId]); // Run this effect when initialFlagId changes

  return (
    <div
      className={`flag-icon-container ${
        setShowModal ? "no-pointer-events" : ""
      }`}
    >
      <BsFlag
        style={{ color: selectedColor.color }}
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <div className="flag-dropdown">
          <button
            className="close-button"
            onClick={() => setShowDropdown(false)}
          >
            X
          </button>
          <div>
            {colors.map((color) => (
              <div
                key={color.name}
                className={`color-option ${
                  selectedColor.name === color.name ? "selected" : ""
                }`}
                style={{ backgroundColor: color.color }}
                onClick={() => handleColorSelection(color)}
              ></div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Enter flag name"
            value={flagName}
            onChange={(e) => setFlagName(e.target.value)}
            className="input-flag"
          />
          <button onClick={handleSaveFlag} className="save-flag">
            Save Flag
          </button>
        </div>
      )}
      <p style={{ color: selectedColor.color }}>{flagName}</p>
      <button onClick={handleDeleteFlag}>Delete Flag</button>
    </div>
  );
};

export default FlagIcon;
