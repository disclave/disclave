import React from 'react';
import { Layout } from '@/modules/layout';
import { PageCommentModel, PageDetailsModel, RankingPageModel } from '@disclave/client';
import { WebsiteInfo, WebsiteInfoSkeleton } from './info';
import { WebsiteComments } from './comments';
import { loginHref } from '@/pages/auth/login';
import { websiteHrefRaw } from '@/pages/website/[website]';
import { registerHref } from '@/pages/auth/register';
import { WebsiteTopCommentedPages, WebsiteTopRatedPages } from './rankings';

export interface WebsitePageProps {
  website: string;
  pageDetails: PageDetailsModel | null;
  comments: Array<PageCommentModel>;
  topCommentedPages: {
    pages: Array<RankingPageModel>;
    limit: number;
    minCommentsVoteSum: number;
  };
  topRatedPages: {
    pages: Array<RankingPageModel>;
    limit: number;
    minPagesVoteSum: number;
    minCommentsVoteSum: number;
  };
}

export const WebsitePage: React.VFC<WebsitePageProps> = ({
  website,
  pageDetails,
  comments,
  topCommentedPages,
  topRatedPages
}) => {
  const loginHrefWithRedirect = loginHref(websiteHrefRaw, website);
  const registerHrefWithRedirect = registerHref(websiteHrefRaw, website);

  const urlId = pageDetails
    ? { websiteId: pageDetails.websiteId, pageId: pageDetails.pageId }
    : null;

  return (
    <Layout loginHref={loginHrefWithRedirect} registerHref={registerHrefWithRedirect}>
      <div className="container max-w-5xl mx-auto py-8 px-4">
        {pageDetails ? <WebsiteInfo pageDetails={pageDetails} /> : <WebsiteInfoSkeleton />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-4">
          <div className="lg:col-span-2">
            <WebsiteComments
              urlId={urlId}
              website={website}
              comments={comments}
              loginHref={loginHrefWithRedirect}
              registerHref={registerHrefWithRedirect}
            />
          </div>
          <div>
            <h3 className="text-lg">
              {/* TODO: add skeleton loader if urlId is null */}
              {/* TODO: add translations */}
              More from <span className="font-semibold">{urlId?.websiteId}</span>
            </h3>

            {/* TODO: add skeleton loading if no urlId */}
            {urlId ? (
              <WebsiteTopCommentedPages
                pages={topCommentedPages.pages}
                pagesLimit={topCommentedPages.limit}
                minCommentsVoteSum={topCommentedPages.minCommentsVoteSum}
                urlId={urlId}
              />
            ) : null}

            {/* TODO: add skeleton loading if no urlId */}
            {urlId ? (
              <WebsiteTopRatedPages
                pages={topRatedPages.pages}
                pagesLimit={topRatedPages.limit}
                minCommentsVoteSum={topRatedPages.minCommentsVoteSum}
                minPagesVoteSum={topRatedPages.minPagesVoteSum}
                urlId={urlId}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};
