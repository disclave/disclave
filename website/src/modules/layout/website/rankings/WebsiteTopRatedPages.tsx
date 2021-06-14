import React from 'react';
import { RankingPageModel, UrlId } from '@disclave/client';
import { useTopRatedPages } from '@/modules/pages';
import { WebsitePagesRankingPreview } from './WebsitePagesRankingPreview';
import { topRatedPagesHref } from '@/pages/pages/top-rated';

export interface WebsiteTopRatedPagesProps {
  className?: string;
  pages: Array<RankingPageModel>;
  pagesLimit: number;
  minPagesVoteSum: number;
  minCommentsVoteSum: number;
  urlId: UrlId;
}

export const WebsiteTopRatedPages: React.VFC<WebsiteTopRatedPagesProps> = (props) => {
  const { pages, voteRemove, voteUp, voteDown } = useTopRatedPages(
    props.pages,
    props.minPagesVoteSum,
    props.minCommentsVoteSum,
    props.pagesLimit,
    props.urlId.websiteId,
    props.urlId.pageId
  );

  // TODO: add translations
  return (
    <WebsitePagesRankingPreview
      className={props.className}
      pages={pages}
      header="Top rated"
      href={topRatedPagesHref()}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
