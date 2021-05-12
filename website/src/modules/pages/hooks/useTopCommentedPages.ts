import { PageModel } from '@disclave/client';
import { usePages } from '@/modules/pages/hooks/usePages';

type UseTopCommentedPages = {
  pages: PageModel[];
};

export const useTopCommentedPages = (initialState: Array<PageModel>): UseTopCommentedPages => {
  const { pages } = usePages(initialState);

  return {
    pages: pages
  };
};
