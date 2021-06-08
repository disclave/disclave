import { useEffect, useRef, useState } from 'react';
import {
  addPageVoteDown,
  addPageVoteUp,
  PageModel,
  removePageVote,
  useSession
} from '@disclave/client';

type SetPages = (data: Array<PageModel>) => void;
type VoteDown = (websiteId: string, pageId: string) => Promise<void>;
type VoteRemove = (websiteId: string, pageId: string) => Promise<void>;
type VoteUp = (websiteId: string, pageId: string) => Promise<void>;
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

  const onVoteUp = async (websiteId: string, pageId: string) => {
    await addPageVoteUp({websiteId, pageId});
  };

  const onVoteDown = async (websiteId: string, pageId: string) => {
    await addPageVoteDown({websiteId, pageId});
  };

  const onVoteRemove = async (websiteId: string, pageId: string) => {
    await removePageVote({websiteId, pageId});
  };

  return {
    pages: pages,
    setPages: setPages,
    voteDown: onVoteDown,
    voteRemove: onVoteRemove,
    voteUp: onVoteUp
  };
};
