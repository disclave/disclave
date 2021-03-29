import React from "react";
import { Button } from "@/components/button";
import { FormErrorContainer, FormFactory, TextArea } from "@/components/forms";
import { useLoading } from "@/hooks";
import { useTranslation } from "@/i18n";

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

  const className = ["flex flex-col space-y-2", props.className ?? ""].join(
    " "
  );

  return (
    <Form onSubmit={onSubmit} className={className}>
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
