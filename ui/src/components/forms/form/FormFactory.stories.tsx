import React from "react";

import { FormFactory } from "./FormFactory";
import { Story } from "@storybook/react";
import { Button } from "../../button";
import { Textarea } from "../textarea";
import { TextField } from "../textfield";

export default {
  title: "Forms",
  component: FormFactory,
};

const Template: Story = () => {
  const FormField = {
    requiredField: "requiredField",
    maxLenField: "maxLenField",
    defaultField: "defaultField",
    textArea: "textArea",
  } as const;

  interface FormData {
    [FormField.requiredField]: string;
    [FormField.maxLenField]: string;
    [FormField.defaultField]: string;
    [FormField.textArea]: string;
  }

  const onSubmit = (data: FormData) => console.log("Submit", data);

  const Form = FormFactory<FormData>();

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <TextField
        placeholder="Required example"
        name={FormField.requiredField}
        options={{ required: true }}
      />
      <TextField
        placeholder="Max length example"
        name={FormField.maxLenField}
        options={{ maxLength: { value: 3, message: "Max len is 3" } }}
      />
      <TextField placeholder="Default example" name={FormField.defaultField} />
      <Textarea
        placeholder="Required text area"
        name={FormField.textArea}
        options={{ required: true }}
      />
      <div className="space-x-4">
        <Button type="reset" flat>
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

export const Default = Template.bind({});
