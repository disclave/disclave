import React from "react";
import { useState } from "react";
import { Button } from "../../button";
import { Textarea } from "../../forms/textarea";
import { useTranslation } from "react-i18next";

export interface CommentAddFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export const CommentAddForm: React.VFC<CommentAddFormProps> = (props) => {
  const [text, setText] = useState("");
  const { t } = useTranslation("comments");

  const onButtonClick = async () => {
    // TODO: add error handling
    await props.onSubmit(text);
    setText("");
  };

  return (
    <div className="flex flex-row content-center space-x-4">
      <Textarea
        className="flex-1"
        value={text}
        onChange={setText}
        autoGrow
        placeholder={t("add.input.placeholder")}
      />
      <div>
        <Button onClick={onButtonClick}>{t("add.button")}</Button>
      </div>
    </div>
  );
};
