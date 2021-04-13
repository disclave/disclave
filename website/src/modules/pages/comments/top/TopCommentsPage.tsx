import React from 'react';
import { Layout } from '@/modules/layout';
import {
  addCommentVoteDown,
  addCommentVoteUp,
  CommentModel,
  CommentUrlMeta,
  removeCommentVote,
  useSession
} from '@disclave/client';
import { CommentsList } from '@disclave/ui';
import { useTopComments } from '@/modules/comments';
import { websiteHref } from '@/pages/website/[website]';

export interface TopCommentsPageProps {
  comments: Array<CommentModel>;
  commentsLimit: number;
  minVoteSum: number;
  serverSideUid: string | null;
}

export const TopCommentsPage: React.VFC<TopCommentsPageProps> = (props) => {
  const { profile } = useSession();
  const { comments } = useTopComments(
    props.comments,
    props.minVoteSum,
    props.commentsLimit,
    props.serverSideUid
  );

  const onVoteUp = async (commentId: string) => {
    await addCommentVoteUp(commentId);
  };

  const onVoteDown = async (commentId: string) => {
    await addCommentVoteDown(commentId);
  };

  const onVoteRemove = async (commentId: string) => {
    await removeCommentVote(commentId);
  };

  const websiteHrefBuilder = (urlMeta: CommentUrlMeta) =>
    websiteHref(urlMeta.websiteId + urlMeta.pageId, true);

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <CommentsList
            authenticated={!!profile}
            comments={comments}
            hrefBuilder={websiteHrefBuilder}
            preview={true}
            showWebsite={true}
            onVoteUp={onVoteUp}
            onVoteDown={onVoteDown}
            onVoteRemove={onVoteRemove}
          />
        </div>
      </section>
    </Layout>
  );
};
