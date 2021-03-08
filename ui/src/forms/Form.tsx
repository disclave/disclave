import * as React from "react";

interface FormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.FC<FormProps> = (props) => {
  return <form onSubmit={props.onSubmit}>{props.children}</form>;
};
