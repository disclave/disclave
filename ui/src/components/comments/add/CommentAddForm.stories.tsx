import React from "react";

import { CommentAddForm, CommentAddFormProps } from "./CommentAddForm";
import { Story } from "@storybook/react";
import { sleep } from "@/stories/Helpers";

export default {
  title: "Comments/Add",
  component: CommentAddForm,
};

const onSubmitCorrect = async () => {
  await sleep();
};

const onSubmitError = async () => {
  await sleep(2000, { code: "comment-error-code" });
};

const Template: Story<CommentAddFormProps> = (args) => (
  <CommentAddForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: onSubmitCorrect,
};

export const ErrorHandler = Template.bind({});
ErrorHandler.args = {
  onSubmit: onSubmitError,
};
