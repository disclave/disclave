import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FormInputChildProps } from "../input/Input";

export interface FormProps<T extends FieldValues> {
  className?: string;
  onSubmit: SubmitHandler<T>;
}

export const FormFactory = <T extends FieldValues>(): React.FC<
  FormProps<T>
> => ({ className, onSubmit, children }) => {
  const { handleSubmit, register, errors } = useForm<T>();

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(
        children as any,
        (child: React.ReactElement<FormInputChildProps<any>>) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: register,
                  errors: errors,
                  key: child.props.name,
                },
              })
            : child;
        }
      )}
    </form>
  );
};
