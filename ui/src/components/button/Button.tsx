import React from "react";

import "./Button.css";

const classes = `
  border-transparent border
  text-white 
  bg-indigo-600 hover:bg-indigo-700 
  inline-flex items-center px-4 py-2
  rounded-md shadow-sm 
  text-sm font-medium 
  focus:ring-indigo-500 focus:outline-node focus:ring-2 focus:ring-offset-2
`;

export interface ButtonProps {
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => (
  <button className={classes} onClick={props.onClick}>
    {props.children}
  </button>
);
