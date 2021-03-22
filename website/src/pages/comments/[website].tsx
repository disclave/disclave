import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentsContainer } from '@webchat/ui';
import { loginHref } from '../auth/login';
import { createComment, CommentModel, UserContext } from '@webchat/client';
import { getCommentService, init } from '@webchat/server';

export const websiteCommentsHref = (url: string) => websiteCommentsHrefRaw + url;
export const websiteCommentsHrefRaw = '/comments/';

export const getServerSideProps: GetServerSideProps = async (context) => {
  init(JSON.parse(process.env.FIREBASE_CERT));
  const service = getCommentService();
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

  const headerHeight = '48px';

  const loginHrefWithRedirect = loginHref(websiteCommentsHrefRaw, website as string);

  return (
    <div>
      <main>
        <div style={{ height: headerHeight }} className="p-3">
          {website}
        </div>
        <div style={{ height: `calc(100vh - ${headerHeight})` }} className="p-3">
          <CommentsContainer
            authenticated={!!user}
            comments={comments}
            className="max-h-full"
            loginHref={loginHrefWithRedirect}
            onSubmit={onCommentAdd}
          />
        </div>
      </main>
    </div>
  );
};
export default Website;
