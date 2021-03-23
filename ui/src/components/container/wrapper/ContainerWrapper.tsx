import React from "react";

export interface ContainerWrapperProps {
  title?: string;
}

export const ContainerWrapper: React.FC<ContainerWrapperProps> = (props) => {
  return (
    <div className="max-w-sm border rounded p-6">
      {props.title ? (
        <div className="mb-4 font-semibold text-lg">{props.title}</div>
      ) : (
        <></>
      )}
      {props.children}
    </div>
  );
};
