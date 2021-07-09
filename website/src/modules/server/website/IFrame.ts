import { DefaultProps, getDefaultProps } from '@/modules/server';
import { PageCommentModel, PageDetailsModel } from '@disclave/client';
import { IncomingMessage } from 'http';
import { getPageCommentService, getPageDetailsService } from '@disclave/server';

export interface IFrameProps extends DefaultProps {
  comments: Array<PageCommentModel>;
  pageDetails: PageDetailsModel;
  website: string;
  hideVotes: boolean;
}

export async function getIFrameSSP(
  query: {
    website: string;
    hideVotes?: boolean;
  },
  req: IncomingMessage,
  locale: string,
  translationNamespaces: string[]
): Promise<IFrameProps> {
  const defaultProps = await getDefaultProps({ req, locale }, translationNamespaces, {
    iframe: true
  });

  const commentService = getPageCommentService();
  const pageDetailsService = getPageDetailsService();

  const pageDetails = await pageDetailsService.getPageDetails(
    query.website,
    defaultProps.serverSideUid
  );

  const urlId = {
    websiteId: pageDetails.websiteId,
    pageId: pageDetails.pageId
  };

  const comments = await commentService.getPageComments(urlId, defaultProps.serverSideUid);

  const hideVotes = query.hideVotes !== undefined;

  return {
    comments,
    pageDetails: pageDetails,
    website: query.website,
    hideVotes,
    ...defaultProps
  };
}
