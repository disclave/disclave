import React from "react";

import "./Button.css";

export interface ButtonProps {
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const classes = `
    bg-gray-700
    text-white
    rounded
    px-4 py-2
    focus:outline-none
  `;

  return (
    <button className={classes} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
