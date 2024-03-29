import { DefaultProps, getDefaultProps } from '@/modules/server';
import { RankingCommentModel } from '@disclave/client';
import { IncomingMessage } from 'http';
import { getCommentRankingService } from '@disclave/server';

export interface LatestCommentsProps extends DefaultProps {
  comments: Array<RankingCommentModel>;
  commentsLimit: number;
  minVoteSum: number;
}

export async function getLatestCommentsSSP(
  req: IncomingMessage,
  locale: string,
  translationNamespaces: string[]
): Promise<LatestCommentsProps> {
  const defaultProps = await getDefaultProps({ req, locale }, translationNamespaces);

  const service = getCommentRankingService();

  const minVoteSum = 1;
  const commentsLimit = 0;

  const comments = await service.getLatestComments(
    minVoteSum,
    commentsLimit,
    defaultProps.serverSideUid
  );

  return {
    comments,
    commentsLimit,
    minVoteSum,
    ...defaultProps
  };
}
