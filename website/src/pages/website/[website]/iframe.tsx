import React from 'react';
import { GetServerSideProps } from 'next';
import { WebsiteIframePage } from '@/modules/layout/website/iframe';
import { NextSeo } from 'next-seo';
import { domain } from '@/consts';
import { websiteHref } from '.';
import { PageUrl } from '@/PageUrl';
import { getIFrameSSP, IFrameProps } from '@/modules/server/website';

export const websiteIframeHref: PageUrl = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps<IFrameProps> = async ({
  req,
  locale,
  query
}) => {
  // TODO: add validation
  const website = query.website as string;
  const hideVotes = query.hideVotes ? true : undefined;

  const props = await getIFrameSSP({ website, hideVotes }, req, locale, ['common']);
  return {
    props
  };
};

const IFrame: React.VFC<IFrameProps> = (props) => {
  return (
    <>
      <NextSeo canonical={domain + websiteHref(props.website)} />
      <WebsiteIframePage
        website={props.website}
        pageDetails={props.pageDetails}
        comments={props.comments}
        hideVotes={props.hideVotes}
      />
    </>
  );
};
export default IFrame;
