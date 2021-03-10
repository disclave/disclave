import React from "react";
import { useState } from "react";
import { Input } from "../../forms/input";
import { Button } from "../../button";

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
    <div className="flex flex-col">
      {/*TODO: change input to textbox*/}
      <Input type="text" value={text} onChange={setText} />
      <div>
        <Button onClick={onButtonClick}>Add Comment</Button>
      </div>
    </div>
  );
};
