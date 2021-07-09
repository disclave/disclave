import { DefaultProps, getDefaultProps } from '@/modules/server';
import { RankingPageModel } from '@disclave/client';
import { IncomingMessage } from 'http';
import { getPageRankingService } from '@disclave/server';

export interface TopRatedPagesProps extends DefaultProps {
  pages: Array<RankingPageModel>;
  limit: number;
  minPagesVoteSum: number;
  minCommentsVoteSum: number;
}

export async function getTopRatedPagesSSP(
  req: IncomingMessage,
  locale: string,
  translationNamespaces: string[]
): Promise<TopRatedPagesProps> {
  const defaultProps = await getDefaultProps({ req, locale }, translationNamespaces);

  const service = getPageRankingService();

  const config = {
    limit: 100, // TODO: add pagination
    commentsMinVoteSum: 0,
    pageMinVoteSum: 1,
    websiteId: null,
    excludePageId: null
  };

  const pages = await service.getTopRatedPages(config, defaultProps.serverSideUid);

  return {
    pages,
    limit: config.limit,
    minPagesVoteSum: config.pageMinVoteSum,
    minCommentsVoteSum: config.commentsMinVoteSum,
    ...defaultProps
  };
}
