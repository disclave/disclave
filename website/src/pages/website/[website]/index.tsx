import React from 'react';
import { GetServerSideProps } from 'next';
import { UrlId, encodeUrl } from '@disclave/client';
import { WebsitePage } from '@/modules/layout/website';
import { usePageDetails } from '@/modules/pages';
import { PageUrl } from '@/PageUrl';
import { getWebsiteSSP, WebsiteProps } from '@/modules/server/website';

export const websiteHrefFromIds: PageUrl = (websiteId: string, pageId: string) =>
  websiteHrefFromMeta({ websiteId, pageId });
export const websiteHrefFromMeta: PageUrl = (urlId: UrlId, commentId?: string) =>
  websiteHref(urlId.websiteId + urlId.pageId + (commentId ? `#${commentId}` : ''), true);
export const websiteHref: PageUrl = (url: string, encoded: boolean = false) =>
  websiteHrefRaw() + (encoded ? url : encodeUrl(url));
export const websiteHrefRaw: PageUrl = () => '/website/';

export const getServerSideProps: GetServerSideProps<WebsiteProps> = async ({
  req,
  locale,
  query
}) => {
  // TODO: add validation
  const website = query.website as string;

  const props = await getWebsiteSSP({ website }, req, locale, ['common', 'layout', 'website']);
  return {
    props
  };
};

const Website: React.VFC<WebsiteProps> = (props) => {
  const { pageDetails } = usePageDetails(props.website, props.pageDetails);

  return (
    <WebsitePage
      website={props.website}
      pageDetails={pageDetails}
      comments={props.comments}
      topCommentedPages={props.topCommentedPages}
      topRatedPages={props.topRatedPages}
    />
  );
};
export default Website;
