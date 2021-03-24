import React from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  FormProvider,
} from "react-hook-form";

export interface FormProps<T extends FieldValues> {
  className?: string;
  onSubmit: SubmitHandler<T>;
}

export const FormFactory = <T extends FieldValues>(): React.FC<
  FormProps<T>
> => ({ className, onSubmit, children }) => {
  const methods = useForm<T>();

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
