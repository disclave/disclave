import React from "react";
import { useState } from "react";
import { Input } from "../../forms/input";
import { Button } from "../../button";

interface CommentAddFormProps {
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
    <div>
      <Input type="text" value={text} onChange={setText} />
      <Button onClick={onButtonClick}>Send</Button>
    </div>
  );
};
