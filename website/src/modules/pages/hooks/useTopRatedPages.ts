import { getTopRatedPages, PageModel } from '@disclave/client';
import { usePages } from '@/modules/pages/hooks/usePages';

type VoteDown = (url: string) => Promise<void>;
type VoteRemove = (url: string) => Promise<void>;
type VoteUp = (url: string) => Promise<void>;
type UseTopRatedPages = {
  pages: PageModel[];
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useTopRatedPages = (
  initialState: Array<PageModel>,
  minVoteSum: number,
  limit: number
): UseTopRatedPages => {
  const fetchPages = async () => {
    return await getTopRatedPages(minVoteSum, limit, true);
  };

  const { pages, voteUp, voteDown, voteRemove } = usePages(initialState, fetchPages);

  return {
    pages: pages,
    voteUp,
    voteDown,
    voteRemove
  };
};
