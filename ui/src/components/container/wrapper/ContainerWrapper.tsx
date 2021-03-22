import React from "react";

export const ContainerWrapper: React.FC = ({ children }) => {
  return <div className="max-w-sm border rounded p-6">{children}</div>;
};
