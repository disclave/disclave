import React from "react";

export interface FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export const Form: React.FC<FormProps> = (props) => {
  return <form onSubmit={props.onSubmit}>{props.children}</form>;
};
