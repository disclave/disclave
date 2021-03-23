import React from "react";
import { Button } from "../../button";
import { Textarea } from "../../forms";
import { useTranslation } from "react-i18next";
import { FormFactory, TextField } from "../../forms";

const commentField = "comment";

interface FormData {
  [commentField]: string;
}

export interface CommentAddFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export const CommentAddForm: React.VFC<CommentAddFormProps> = (props) => {
  const { t } = useTranslation("comments");

  const onSubmit = async (data: FormData) => {
    // TODO: add error handling
    await props.onSubmit(data[commentField]);
  };

  const Form = FormFactory<FormData>();

  return (
    <Form
      className="flex flex-row content-center space-x-4"
      onSubmit={onSubmit}
    >
      <Textarea
        className="flex-1"
        name={commentField}
        autoGrow
        placeholder={t("add.input.placeholder")}
        options={{ required: true }}
      />
      <div>
        <Button type="submit">{t("add.button")}</Button>
      </div>
    </Form>
  );
};
