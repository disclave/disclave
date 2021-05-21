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

const container = new Container();

container.bind(EmailService).to(MailjetEmailService);
container.bind(AuthProvider).to(FirebaseAuthProvider);

container.bind(ProfileRepository).to(ProfileMongoRepository);
container.bind(CommentRepository).to(CommentMongoRepository);
container.bind(PageRepository).to(PageMongoRepository);

container.bind(UrlService).to(UrlServiceImpl);
container.bind(ImageService).to(ImageServiceImpl);
container.bind(ProfileService).to(ProfileServiceImpl);
container.bind(CommentService).to(CommentServiceImpl);
container.bind(PageService).to(PageServiceImpl);

export { container };
