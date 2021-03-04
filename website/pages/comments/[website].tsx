import React from "react";
import {useRouter} from "next/router";
import {CommentService} from "../../server/comments/CommentService";
import {GetServerSideProps} from "next";
import {Comment} from "../../server/comments/Comment";

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
  comments: Array<Comment>
}

const Website: React.FC<WebsiteProps> = ({comments}) => {
  const router = useRouter()
  const {website} = router.query

  return (
    <div>
      <main>
        {website}

        {JSON.stringify(comments)}
      </main>
    </div>
  )
}
export default Website
