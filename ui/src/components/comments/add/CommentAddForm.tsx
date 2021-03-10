import React from "react";
import { useState } from "react";
import { Button } from "../../button";
import { Textarea } from "../../forms/textarea";
import "./CommentAddForm.css";

export interface CommentAddFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export const CommentAddForm: React.VFC<CommentAddFormProps> = (props) => {
  const [text, setText] = useState("");

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
        placeholder="Add comment"
      />
      <div>
        <Button onClick={onButtonClick}>Add</Button>
      </div>
    </div>
  );
};
