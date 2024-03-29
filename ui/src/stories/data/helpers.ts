import { PageCommentModel, RankingCommentModel } from "@/types";

export const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const randomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const commentsTimestampComparator = (
  a: PageCommentModel | RankingCommentModel,
  b: PageCommentModel | RankingCommentModel
) => Date.parse(b.timestamp) - Date.parse(a.timestamp);
