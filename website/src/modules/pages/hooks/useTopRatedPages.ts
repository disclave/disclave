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
  loading: boolean,
  minPagesVoteSum: number,
  minCommentsVoteSum: number,
  limit: number,
  websiteId: string | null,
  excludePageId: string | null
): UseTopRatedPages => {
  const fetchPages = async () => {
    return await getTopRatedPages(
      {
        commentsMinVoteSum: minCommentsVoteSum,
        pageMinVoteSum: minPagesVoteSum,
        limit: limit,
        excludePageId: excludePageId,
        websiteId: websiteId
      },
      true
    );
  };

  const { pages, voteUp, voteDown, voteRemove } = usePageRanking(initialState, loading, fetchPages);

  return {
    pages: pages,
    voteUp,
    voteDown,
    voteRemove
  };
};
