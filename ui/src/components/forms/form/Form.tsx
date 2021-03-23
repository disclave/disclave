import React from "react";
import { useForm } from "react-hook-form";
import { FormInputChildProps } from "../input/Input";

export interface FormProps {
  className?: string;
  defaultValues?: Record<string, any>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const Form: React.FC<FormProps> = ({
  className,
  defaultValues,
  onSubmit,
  children,
}) => {
  const { handleSubmit, register, errors } = useForm({ defaultValues });

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
