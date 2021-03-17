import React from "react";

export interface ButtonProps {
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const classes = `
    bg-gray-700
    text-white text-sm 
    font-medium uppercase
    rounded
    px-3.5 py-2
    focus:outline-none
  `;

  return (
    <button className={classes} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
