import * as React from "react";

export interface ButtonProps {
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClick?.();
  };

  return <button onClick={onClick}>{props.children}</button>;
};
