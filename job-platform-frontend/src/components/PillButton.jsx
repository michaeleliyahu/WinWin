import React from "react";
import "../styles/PillButton.css";

export default function PillButton({ label, variant = "light", onClick }) {
  return (
    <div
      className={`pill-button ${variant === "dark" ? "dark" : "light"}`}
      onClick={onClick}
    >
      <p>{label}</p>
    </div>
  );
}
