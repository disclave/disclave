import * as React from "react";
import { Input } from "../../forms/Input";
import { useState } from "react";
import { Button } from "../../button/Button";

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
