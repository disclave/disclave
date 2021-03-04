import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {CommentService} from "../../server/comments/CommentService";
import {GetServerSideProps} from "next";
import {CommentModel} from "../../modules/comments/CommentModel"
import {CommentsView} from "../../modules/comments/components/CommentsView";
import {createComment, getComments} from "../../modules/comments/CommentClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const service = new CommentService()
  const {website} = context.query
  const comments = await service.getComments(website as string)

  return {
    props: {
      comments
    }
  }
}

interface WebsiteProps {
  comments: Array<CommentModel>
}

const Website: React.FC<WebsiteProps> = (props) => {
  const router = useRouter()
  const {website} = router.query

  const [comments, setComments] = useState(props.comments)

  const onCommentAdd = async (text: string) => {
    const url = website as string
    await createComment(text, url)
    const newComments = await getComments(url)
    setComments(newComments)
  }

  return (
    <div>
      <main>
        {website}

        <CommentsView comments={comments} onCommentAdd={onCommentAdd}/>
      </main>
    </div>
  )
}
export default Website
