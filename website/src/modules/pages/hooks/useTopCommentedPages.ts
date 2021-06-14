import { getTopCommentedPages, RankingPageModel } from '@disclave/client';
import { usePageRanking } from '@/modules/pages/hooks/usePageRanking';

type VoteDown = (websiteId: string, pageId: string) => Promise<void>;
type VoteRemove = (websiteId: string, pageId: string) => Promise<void>;
type VoteUp = (websiteId: string, pageId: string) => Promise<void>;
type UseTopCommentedPages = {
  pages: RankingPageModel[];
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useTopCommentedPages = (
  initialState: Array<RankingPageModel>,
  minCommentsVoteSum: number,
  limit: number
): UseTopCommentedPages => {
  const fetchPages = async () => {
    return await getTopCommentedPages(
      {
        commentsMinVoteSum: minCommentsVoteSum,
        limit: limit,
        excludePageId: null,
        websiteId: null
      },
      true
    );
  };

  const { pages, voteUp, voteDown, voteRemove } = usePageRanking(initialState, fetchPages);

  return {
    pages: pages,
    voteUp,
    voteDown,
    voteRemove
  };
};
