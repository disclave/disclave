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
  const requiredField = "requiredField";
  const maxLenField = "maxLenField";
  const defaultField = "defaultField";
  const textArea = "textArea";

  interface FormData {
    [requiredField]: string;
    [maxLenField]: string;
    [defaultField]: string;
    [textArea]: string;
  }

  const onSubmit = (data: FormData) => console.log("Submit", data);

  const Form = FormFactory<FormData>();

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <TextField
        placeholder="Required example"
        name={requiredField}
        options={{ required: true }}
      />
      <TextField
        placeholder="Max length example"
        name={maxLenField}
        options={{ maxLength: { value: 3, message: "Max len is 3" } }}
      />
      <TextField placeholder="Default example" name={defaultField} />
      <Textarea
        placeholder="Required text area"
        name={textArea}
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
