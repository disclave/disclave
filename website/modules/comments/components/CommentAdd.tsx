import React, {useState} from "react";
import {Input} from "../../ui/Input";
import {Form} from "../../ui/Form";

export interface CommentAddProps {
  onSubmit: (text: string) => Promise<void>
}

export const CommentAdd: React.FC<CommentAddProps> = ({onSubmit}) => {
  const [text, setText] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmit(text)
    setText('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Add comment:
        <Input type="text" name="text" value={text} onChange={setText}/>
      </label>
      <Input type="submit" value="Submit" />
    </Form>
  )
}