import { container } from '../../server/inversify.config';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentModel } from '../../modules/comments/CommentModel';
import { CommentsView } from '../../modules/comments/components/CommentsView';
import { createComment } from '../../modules/comments/CommentClient';
import { CommentService } from '../../server/comments';
import { CommentsContainer } from '@webchat/ui';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const service = container.get(CommentService);
  const { website } = context.query;
  const comments = await service.getComments(website as string);

  return {
    props: {
      comments
    }
  };
};

interface WebsiteProps {
  comments: Array<CommentModel>;
}

const Website: React.FC<WebsiteProps> = (props) => {
  const router = useRouter();
  const { website } = router.query;

  const [comments, setComments] = useState(props.comments);

  const onCommentAdd = async (text: string) => {
    try {
      const url = website as string;
      const addedComment = await createComment(text, url);
      setComments([addedComment, ...comments]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <main>
        {website}

        {/*<CommentsView comments={comments} onCommentAdd={onCommentAdd} />*/}

        <CommentsContainer comments={comments} onSubmit={onCommentAdd} />
      </main>
    </div>
  );
};
export default Website;
