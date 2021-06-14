import React from 'react';
import { RankingPageModel, useSession } from '@disclave/client';
import { PagesList } from '@disclave/ui';
import { websiteHref } from '@/pages/website/[website]';

export interface WebsitePagesRankingPreviewProps {
  className?: string;
  pages: Array<RankingPageModel>;
  header: string;
  href: string;
  onVoteDown: (websiteId: string, pageId: string) => Promise<void>;
  onVoteRemove: (websiteId: string, pageId: string) => Promise<void>;
  onVoteUp: (websiteId: string, pageId: string) => Promise<void>;
}

export const WebsitePagesRankingPreview: React.VFC<WebsitePagesRankingPreviewProps> = (props) => {
  const { isAuthenticated } = useSession();

  return (
    <section className={props.className}>
      <h4 className="text-xl">{props.header}</h4>
      {/* TODO: hide domain and icon from preview (it is always the same) */}
      {/* TODO: fix link - it is not refreshing the page */}
      <PagesList
        className="py-3"
        actionHandler={{
          onVoteDown: props.onVoteDown,
          onVoteRemove: props.onVoteRemove,
          onVoteUp: props.onVoteUp
        }}
        authenticated={isAuthenticated}
        hrefBuilder={websiteHref}
        pages={props.pages}
      />
    </section>
  );
};
