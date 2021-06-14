import { getTopRatedPages, RankingPageModel } from '@disclave/client';
import { usePageRanking } from '@/modules/pages/hooks/usePageRanking';

type VoteDown = (websiteId: string, pageId: string) => Promise<void>;
type VoteRemove = (websiteId: string, pageId: string) => Promise<void>;
type VoteUp = (websiteId: string, pageId: string) => Promise<void>;
type UseTopRatedPages = {
  pages: RankingPageModel[];
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useTopRatedPages = (
  initialState: Array<RankingPageModel>,
  minPagesVoteSum: number,
  minCommentsVoteSum: number,
  limit: number
): UseTopRatedPages => {
  const fetchPages = async () => {
    return await getTopRatedPages(
      {
        commentsMinVoteSum: minCommentsVoteSum,
        pageMinVoteSum: minPagesVoteSum,
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
