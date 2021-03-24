import React from "react";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";
import { FormErrorContainer, FormFactory, TextArea } from "../../forms";
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
  const [loading, runWithLoading, error] = useLoading(false);

  const onSubmit = async (data: FormData) => {
    await runWithLoading(() => props.onSubmit(data.comment));
  };

  const Form = FormFactory<FormData>();

  return (
    <Form onSubmit={onSubmit} className="flex flex-col space-y-2">
      <div className="flex flex-row content-center space-x-4 bg-white">
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
      </div>
      <FormErrorContainer error={error} />
    </Form>
  );
};
