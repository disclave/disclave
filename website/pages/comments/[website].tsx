import { container } from '../../server/inversify.config';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentModel } from '../../modules/comments/CommentModel';
import { createComment } from '../../modules/comments/CommentClient';
import { CommentService } from '../../server/comments';
import { CommentsContainer } from '@webchat/ui';
import { UserContext } from '../../modules/auth/UserContext';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const service = container.get(CommentService);
  const { website } = context.query;
  console.log(context.query);
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
  const user = useContext(UserContext);

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

  const onLogin = async () => {
    // TODO: use Next.js Links
    await router.push('/auth/login?redirect=' + router.asPath);
  };

  const headerHeight = '48px';

  return (
    <div>
      <main>
        <div style={{ height: headerHeight }} className="p-3">
          {website}
        </div>
        <div style={{ height: `calc(100vh - ${headerHeight})` }} className="p-3">
          <CommentsContainer
            className="max-h-full"
            comments={comments}
            authenticated={!!user}
            onSubmit={onCommentAdd}
            onLogin={onLogin}
          />
        </div>
      </main>
    </div>
  );
};
export default Website;
