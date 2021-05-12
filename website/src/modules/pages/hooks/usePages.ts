import { useState } from 'react';
import { PageModel } from '@disclave/client';

type SetPages = (data: Array<PageModel>) => void;
type UsePages = {
  pages: PageModel[];
  setPages: SetPages;
};

export const usePages = (initialState: Array<PageModel>): UsePages => {
  const [pages, setPages] = useState(initialState);

  return {
    pages: pages,
    setPages: setPages
  };
};
