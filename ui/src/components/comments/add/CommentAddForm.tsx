import React from "react";
import { Button } from "../../button";
import { TextArea, TextField } from "../../forms";
import { useTranslation } from "react-i18next";
import { FormFactory } from "../../forms";
import { useLoading } from "../../../hooks";

const FormField = {
  comment: "comment",
} as const;

interface FormData {
  [FormField.comment]: string;
}

export interface CommentAddFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export const CommentAddForm: React.VFC<CommentAddFormProps> = (props) => {
  const { t } = useTranslation("comments");
  const [loading, , runWithLoading] = useLoading(false);

  const onSubmit = async (data: FormData) => {
    const [, error] = await runWithLoading(() => props.onSubmit(data.comment));

    if (error) {
      // TODO: add error handling
      console.error(error);
    }
  };

  const Form = FormFactory<FormData>();

  return (
    <Form
      className="flex flex-row content-center space-x-4 bg-white"
      onSubmit={onSubmit}
    >
      <TextArea
        autoGrow
        className="flex-grow"
        disabled={loading}
        name={FormField.comment}
        options={{ required: true }}
        placeholder={t("add.input.placeholder")}
      />
      <div>
        <Button type="submit" disabled={loading}>
          {t("add.button")}
        </Button>
      </div>
    </Form>
  );
};
