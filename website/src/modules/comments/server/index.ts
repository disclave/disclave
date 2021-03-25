import { getCommentService } from '@webchat/server';

export const getComments = async (website: string) => {
  const service = getCommentService();
  return await service.getComments(website);
};
