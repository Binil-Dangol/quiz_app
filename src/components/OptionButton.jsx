import React from "react";

const OptionButton = ({ text, selected, correct, onClick }) => {
  const getColor = () => {
    if (!selected) return "white";
    return correct ? "green" : "red";
  };

  return (
    <button
      style={{
        backgroundColor: getColor(),
        padding: "10px 20px",
        margin: "20px 5px 5px 5px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "backgroundColor 1s ease",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default OptionButton;