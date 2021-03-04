import React, {useState} from "react";

export interface CommentAddProps {
  onSubmit: (text: string) => Promise<void>
}

export const CommentAdd: React.FC<CommentAddProps> = ({onSubmit}) => {
  const [text, setText] = useState('')

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add comment:
        <input type="text" name="text" value={text} onChange={handleChange}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}