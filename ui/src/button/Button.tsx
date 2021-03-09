import * as React from "react";

interface InputProps {
  onClick?: () => void;
}

export const Button: React.FC<InputProps> = (props) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClick?.();
  };

  return <button onClick={onClick}>{props.children}</button>;
};
