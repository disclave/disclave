import { container } from "./inversify.config";

export type {
  ServicesConfig,
  DbConfig,
  MailjetConfig,
  AwsConfig,
} from "./init";
export { init } from "./init";
export { runAllMigrations } from "./migrations";

export type { Profile } from "@/modules/profiles";

export type {
  UserId,
  IdToken,
  Email,
  UserCookieContent,
  DecodedIdToken,
} from "@/modules/auth";
export { asUserId, asIdToken, asEmail } from "@/modules/auth";
import { AuthProvider } from "@/modules/auth";
export type { AuthProvider };
export const getAuthProvider = () => container.get(AuthProvider);

import { EmailService } from "@/modules/email";
export type { EmailService };
export const getEmailService = () => container.get(EmailService);

import { ProfileService } from "@/modules/profiles";
export type { ProfileService };
export const getProfileService = () => container.get(ProfileService);

export type { PageComment, UrlId } from "@/modules/comments/page";
export type { RankingComment } from "@/modules/comments/ranking";
import {
  PageCommentService,
  CommentRankingService,
  CommentVoteService,
} from "@/modules/comments";
export type { PageCommentService };
export const getPageCommentService = () => container.get(PageCommentService);
export type { CommentRankingService };
export const getCommentRankingService = () =>
  container.get(CommentRankingService);
export const getCommentVoteService = () => container.get(CommentVoteService);

export type { PageDetails } from "@/modules/pages/details";
export type { RankingPage } from "@/modules/pages/ranking";
import {
  PageDetailsService,
  PageRankingService,
  PageVoteService,
} from "@/modules/pages";
export type { PageDetailsService };
export const getPageDetailsService = () => container.get(PageDetailsService);
export type { PageRankingService };
export const getPageRankingService = () => container.get(PageRankingService);
export type { PageVoteService };
export const getPageVoteService = () => container.get(PageVoteService);
