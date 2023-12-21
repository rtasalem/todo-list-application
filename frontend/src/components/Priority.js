// FlagIcon.js
import React, { useState, useEffect } from "react";
import { BsFlag } from "react-icons/bs";
import axios from "axios";
import "../index.css"; // Assuming the CSS file is named "FlagIcon.css"

const DEFAULT_FLAG = { name: "Black", color: "#000000" };

const FlagIcon = ({ taskId, initialColor, initialName, initialFlagId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColor, setSelectedColor] = useState(DEFAULT_FLAG);
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
      console.log(
        "--------------------------------------- INITIAL ID",
        initialFlagId
      );
      console.log("--------------------------------------- TASK ID", taskId);
      if (taskId && initialFlagId) {
        // Flag already has an id, so it exists in the database and needs to be updated
        const response = await axios.put(
          `http://localhost:3000/api/v1/priorities/${initialFlagId}`,
          {
            name: flagName,
            color: selectedColor.color,
            TaskId: taskId,
          }
        );

        // Update state with the new flag information
        setSelectedColor({
          id: selectedColor.id,
          name: flagName,
          color: selectedColor.color,
        });

        console.log("Flag updated:", response.data);
      } else {
        // Flag doesn't have an id, so it's a new flag and needs to be created
        const response = await axios.post(
          "http://localhost:3000/api/v1/priorities",
          {
            name: flagName,
            color: selectedColor.color,
            TaskId: taskId,
          }
        );

        // Update state with the new flag information
        setSelectedColor({
          id: response.data.id,
          name: flagName,
          color: selectedColor.color,
        });

        console.log("Flag created:", response.data);
        //initialFlagId = response.data.id;
        console.log(
          "--------------------------------------- INITIAL ID AFTER CREATION",
          initialFlagId
        );
      }

      // Close the dropdown after saving/updating the flag
      setShowDropdown(false);

      // You may want to trigger a refresh of your data or update the UI here
    } catch (error) {
      console.error("Error saving/updating flag:", error);
    }
  };

  const closeDropdownOnOutsideClick = (e) => {
    // Check if the clicked element is not part of the flag icon or its dropdown
    if (!e.target.closest(".flag-icon-container")) {
      setShowDropdown(false);
    }
  };
  const handleDeleteFlag = async () => {
    try {
      console.log(initialFlagId);
      if (initialFlagId !== null) {
        // Only attempt to delete if the flag has an id
        const response = await axios.delete(
          `http://localhost:3000/api/v1/priorities/${initialFlagId}`
        );
        console.log("Flag deleted:", response.data);
        initialFlagId = undefined;
        console.log(initialFlagId);

        // Set the default flag and reset the flag name after deletion
        setSelectedColor(DEFAULT_FLAG);
        setFlagName("");
        setShowDropdown(false);
      } else {
        console.warn("Cannot delete flag without an id.");
      }
    } catch (error) {
      console.error("Error deleting flag:", error);
    }
  };

  useEffect(() => {
    // Set the initial color and name from the database when the component mounts
    setSelectedColor({ name: "Custom", color: initialColor });
    setFlagName(initialName || ""); // Set the initial flag name or an empty string

    // Attach a click event listener to the document to close the dropdown on outside click
    document.addEventListener("click", closeDropdownOnOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, [initialColor, initialName]);

  return (
    <div className="flag-icon-container">
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
          />
          <button onClick={handleSaveFlag}>Save Flag</button>
        </div>
      )}
      {/* Display the name of the flag */}
      <p style={{ color: selectedColor.color }}>{flagName}</p>
      <button onClick={handleDeleteFlag}>Delete Flag</button>
    </div>
  );
};

export default FlagIcon;
