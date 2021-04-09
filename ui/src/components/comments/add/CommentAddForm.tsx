import React from "react";
import { Button } from "@/components/button";
import { FormErrorContainer, FormFactory, TextArea } from "@/components/forms";
import { useLoading } from "@/hooks";
import { useTranslation } from "@/i18n";
import classNames from "classnames";

const FormField = {
  comment: "comment",
} as const;

interface FormData {
  [FormField.comment]: string;
}

export interface CommentAddFormProps {
  className?: string;
  onSubmit: (text: string) => Promise<void>;
}

const Form = FormFactory<FormData>();

export const CommentAddForm: React.VFC<CommentAddFormProps> = (props) => {
  const { t } = useTranslation("comments");
  const [loading, runWithLoading, error] = useLoading(false);

  const onSubmit = async (data: FormData, event?: React.BaseSyntheticEvent) => {
    const [, error] = await runWithLoading(() => props.onSubmit(data.comment));
    if (!error && event) {
      const form = event.target as HTMLFormElement;
      form.reset();
    }
  };

  const classes = classNames("flex flex-col space-y-2", props.className);

  const commentMaxLength = 10000;

  return (
    <Form onSubmit={onSubmit} className={classes}>
      <div className="flex flex-row content-center space-x-4 bg-white">
        <TextArea
          autoGrow
          className="flex-grow"
          disabled={loading}
          name={FormField.comment}
          options={{
            required: true,
            maxLength: {
              value: commentMaxLength,
              message: t("add.input.validation.max length", {
                maxLen: commentMaxLength,
              }),
            },
          }}
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
