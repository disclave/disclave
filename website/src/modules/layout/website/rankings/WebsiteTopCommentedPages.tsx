import React from 'react';
import { RankingPageModel, UrlId } from '@disclave/client';
import { useTopCommentedPages } from '@/modules/pages';
import { WebsitePagesRankingPreview } from './WebsitePagesRankingPreview';
import { topRatedPagesHref } from '@/pages/pages/top-rated';

export interface WebsiteTopCommentedPagesProps {
  className?: string;
  pages: Array<RankingPageModel>;
  pagesLimit: number;
  minCommentsVoteSum: number;
  urlId: UrlId;
}

export const WebsiteTopCommentedPages: React.VFC<WebsiteTopCommentedPagesProps> = (props) => {
  const { pages, voteRemove, voteUp, voteDown } = useTopCommentedPages(
    props.pages,
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
      header="Top commented"
      href={topRatedPagesHref()}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
