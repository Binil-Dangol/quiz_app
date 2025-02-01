import React from "react";

const OptionButton = ({ text, selected, correct, onClick }) => {
  // Determine the button's background color based on its state
  const getBackgroundColor = () => {
    if (selected) {
      return correct ? "#28a745" : "#dc3545";
    } else {
      return "#17a2b8"; // Teal for default
    }
  };

  // Determine the button's text color
  const getTextColor = () => {
    return "white";
  };

  return (
    <button
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        padding: "12px 20px",
        margin: "10px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1em",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        transition: "background-color 0.2s",
        minWidth: "200px",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!selected) e.target.style.backgroundColor = "#138496";
      }}
      onMouseLeave={(e) => {
        if (!selected) e.target.style.backgroundColor = "#17a2b8";
      }}
      disabled={selected} // Prevent clicking after selection
    >
      {text}
    </button>
  );
};

export default OptionButton;