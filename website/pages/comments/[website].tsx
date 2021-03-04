import React from "react";
import {useRouter} from "next/router";
import {CommentService} from "../../server/comments/CommentService";
import {GetServerSideProps} from "next";
import {CommentModel} from "../../modules/comments/CommentModel"
import {CommentsList} from "../../modules/comments/components/CommentsList";

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

const Website: React.FC<WebsiteProps> = ({comments}) => {
  const router = useRouter()
  const {website} = router.query

  return (
    <div>
      <main>
        {website}

        <CommentsList comments={comments}/>
      </main>
    </div>
  )
}
export default Website
