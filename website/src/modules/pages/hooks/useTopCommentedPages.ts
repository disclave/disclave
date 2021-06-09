import { getTopCommentedPages, PageModel } from '@disclave/client';
import { usePages } from '@/modules/pages/hooks/usePages';

type VoteDown = (websiteId: string, pageId: string) => Promise<void>;
type VoteRemove = (websiteId: string, pageId: string) => Promise<void>;
type VoteUp = (websiteId: string, pageId: string) => Promise<void>;
type UseTopCommentedPages = {
  pages: PageModel[];
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useTopCommentedPages = (
  initialState: Array<PageModel>,
  minCommentsVoteSum: number,
  limit: number
): UseTopCommentedPages => {
  const fetchPages = async () => {
    return await getTopCommentedPages(minCommentsVoteSum, limit, true);
  };

  const { pages, voteUp, voteDown, voteRemove } = usePages(initialState, fetchPages);

  return {
    pages: pages,
    voteUp,
    voteDown,
    voteRemove
  };
};
