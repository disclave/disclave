import { useEffect, useRef, useState } from 'react';
import {
  addPageVoteDown,
  addPageVoteUp,
  PageModel,
  removePageVote,
  useSession
} from '@disclave/client';

type SetPages = (data: Array<PageModel>) => void;
type VoteDown = (url: string) => Promise<void>;
type VoteRemove = (url: string) => Promise<void>;
type VoteUp = (url: string) => Promise<void>;
type UsePages = {
  pages: PageModel[];
  setPages: SetPages;
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const usePages = (
  initialState: Array<PageModel>,
  getPages: () => Promise<Array<PageModel>>
): UsePages => {
  const [pages, setPages] = useState(initialState);
  const { uid } = useSession();
  const prevUid = useRef(uid);

  const fetchPages = async () => {
    const result = await getPages();
    setPages(result);
  };

  useEffect(() => {
    if (uid != prevUid.current) fetchPages();

    prevUid.current = uid;
  }, [uid]);

  const onVoteUp = async (url: string) => {
    await addPageVoteUp(url);
  };

  const onVoteDown = async (url: string) => {
    await addPageVoteDown(url);
  };

  const onVoteRemove = async (url: string) => {
    await removePageVote(url);
  };

  return {
    pages: pages,
    setPages: setPages,
    voteDown: onVoteDown,
    voteRemove: onVoteRemove,
    voteUp: onVoteUp
  };
};
