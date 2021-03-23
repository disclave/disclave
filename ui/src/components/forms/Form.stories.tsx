import React from "react";

import { Form } from "./Form";
import { Story } from "@storybook/react";
import { Input } from "./input";
import { Button } from "../button";
import { Textarea } from "./textarea";

export default {
  title: "Forms",
  component: Form,
};

const Template: Story = () => {
  const onSubmit = (data: any) => console.log("Submit", data);

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <Input
        placeholder="Required example"
        name="requiredField"
        options={{ required: true }}
      />
      <Input
        placeholder="Max length example"
        name="maxLenField"
        options={{ maxLength: { value: 3, message: "Max len is 3" } }}
      />
      <Input placeholder="Default example" name="defaultField" />
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
