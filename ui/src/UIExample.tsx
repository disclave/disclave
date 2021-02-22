import * as React from "react";

export interface UIExampleProps {
  text: string
}

export const UIExample: React.FC<UIExampleProps> = ({ text = "" }) => {
  return (
    <div>
      <h1>Shared UI library {text}!!</h1>
    </div>
  );
};
