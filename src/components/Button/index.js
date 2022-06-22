import React from "react";

const Button = ({ label, onEvent, variant = "start" }) => {
  const type = {
    start: "ButtonStart",
    restart: "ButtonRestart",
    stop: "ButtonStop"
  };
  return (
    <button className={type[variant]} onClick={onEvent}>
      {label}
    </button>
  );
};

export default Button;
