import { Container } from "inversify";
import "reflect-metadata";
import { CommentRepository } from "@/modules/comments/db";
import { CommentMongoRepository } from "@/modules/comments/db/CommentMongoRepository";
import { CommentService } from "@/modules/comments";
import { CommentServiceImpl } from "@/modules/comments/CommentServiceImpl";
import { ProfileMongoRepository } from "@/modules/profiles/db/ProfileMongoRepository";
import { ProfileRepository } from "@/modules/profiles/db";
import { ProfileService } from "@/modules/profiles";
import { ProfileServiceImpl } from "@/modules/profiles/ProfileServiceImpl";
import { UrlServiceImpl } from "@/modules/url/UrlServiceImpl";
import { UrlService } from "@/modules/url";
import { EmailService } from "@/modules/email";
import { MailjetEmailService } from "@/modules/email/MailjetEmailService";
import { AuthProvider } from "@/modules/auth";
import { FirebaseAuthProvider } from "@/modules/auth/FirebaseAuthProvider";
import { PageRepository } from "./modules/pages/db";
import { PageMongoRepository } from "./modules/pages/db/PageMongoRepository";
import { PageService } from "./modules/pages";
import { PageServiceImpl } from "./modules/pages/PageServiceImpl";
import { ImageService } from "./modules/image";
import { ImageServiceImpl } from "./modules/image/ImageServiceImpl";
import { PageVoteRepository } from "./modules/page-voting/db";
import { PageVoteMongoRepository } from "./modules/page-voting/db/PageVoteMongoRepository";
import { PageRankingRepository } from "./modules/page-ranking/db";
import { PageRankingMongoRepository } from "./modules/page-ranking/db/PageRankingMongoRepository";
import { PageConfigService } from "./modules/page-config";
import { PageConfigServiceImpl } from "./modules/page-config/PageServiceImpl";
import { PageConfigRepository } from "./modules/page-config/db";
import { PageConfigMongoRepository } from "./modules/page-config/db/PageConfigMongoRepository";
import { PageRankingService } from "./modules/page-ranking";
import { PageVoteService } from "./modules/page-voting";
import { PageRankingServiceImpl } from "./modules/page-ranking/PageRankingServiceImpl";
import { PageVoteServiceImpl } from "./modules/page-voting/PageVoteServiceImpl";

const container = new Container();

container.bind(EmailService).to(MailjetEmailService);
container.bind(AuthProvider).to(FirebaseAuthProvider);

container.bind(ProfileRepository).to(ProfileMongoRepository);
container.bind(CommentRepository).to(CommentMongoRepository);
container.bind(PageRepository).to(PageMongoRepository);
container.bind(PageConfigRepository).to(PageConfigMongoRepository);
container.bind(PageRankingRepository).to(PageRankingMongoRepository);
container.bind(PageVoteRepository).to(PageVoteMongoRepository);

container.bind(UrlService).to(UrlServiceImpl);
container.bind(ImageService).to(ImageServiceImpl);
container.bind(ProfileService).to(ProfileServiceImpl);
container.bind(CommentService).to(CommentServiceImpl);
container.bind(PageService).to(PageServiceImpl);
container.bind(PageRankingService).to(PageRankingServiceImpl);
container.bind(PageVoteService).to(PageVoteServiceImpl);
container.bind(PageConfigService).to(PageConfigServiceImpl);

export { container };
