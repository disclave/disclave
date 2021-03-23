import React from "react";

export interface FormProps {}

export const Form: React.FC<FormProps> = (props) => {
  return <form>{props.children}</form>;
};
