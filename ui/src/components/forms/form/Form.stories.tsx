import React from "react";

import { Form } from "./Form";
import { Story } from "@storybook/react";
import { Button } from "../../button";
import { Textarea } from "../textarea";
import { TextField } from "../textfield";

export default {
  title: "Forms",
  component: Form,
};

const Template: Story = () => {
  const onSubmit = (data: any) => console.log("Submit", data);

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <TextField
        placeholder="Required example"
        name="requiredField"
        options={{ required: true }}
      />
      <TextField
        placeholder="Max length example"
        name="maxLenField"
        options={{ maxLength: { value: 3, message: "Max len is 3" } }}
      />
      <TextField placeholder="Default example" name="defaultField" />
      <Textarea
        placeholder="Required text area"
        name="textArea"
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
