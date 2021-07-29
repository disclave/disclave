import { DefaultProps, getDefaultProps } from '@/modules/server';
import { RankingPageModel } from '@disclave/client';
import { IncomingMessage } from 'http';
import { getPageRankingService } from '@disclave/services';

export interface TopCommentedPagesProps extends DefaultProps {
  pages: Array<RankingPageModel>;
  limit: number;
  commentsMinVoteSum: number;
}

export async function getTopCommentedPagesSSP(
  req: IncomingMessage,
  locale: string,
  translationNamespaces: string[]
): Promise<TopCommentedPagesProps> {
  const defaultProps = await getDefaultProps({ req, locale }, translationNamespaces);

  const service = getPageRankingService();

  const config = {
    limit: 100, // TODO: add pagination
    commentsMinVoteSum: 0,
    websiteId: null,
    excludePageId: null
  };

  const pages = await service.getTopCommentedPages(config, defaultProps.serverSideUid);

  return {
    pages,
    limit: config.limit,
    commentsMinVoteSum: config.commentsMinVoteSum,
    ...defaultProps
  };
}
