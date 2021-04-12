import { useEffect, useState, useRef } from 'react';
import { CommentModel, useSession } from '@disclave/client';

type SetComments = (data: Array<CommentModel>) => void;
type UseComments = {
  comments: CommentModel[];
  setComments: SetComments;
};

export const useComments = (
  initialState: Array<CommentModel>,
  getComments: () => Promise<Array<CommentModel>>,
  serverSideUid: string | null
): UseComments => {
  const [comments, setComments] = useState(initialState);
  const { profile, isLoading } = useSession();
  const prevUid = useRef(serverSideUid);

  const fetchComments = async () => {
    const result = await getComments();
    setComments(result);
  };

  useEffect(() => {
    if (isLoading) return;

    if (profile?.uid != prevUid.current) fetchComments();

    prevUid.current = profile?.uid;
  }, [profile?.uid, isLoading]);

  return {
    comments: comments,
    setComments: setComments
  };
};
