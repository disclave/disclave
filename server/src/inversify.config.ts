import { Container } from "inversify";
import "reflect-metadata";

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
import { ImageService } from "./modules/image";
import { ImageServiceImpl } from "./modules/image/ImageServiceImpl";
import { containers as commentsContainers } from "@/modules/comments";
import { containers as pagesContainers } from "@/modules/pages";

const container = new Container();

container.bind(EmailService).to(MailjetEmailService);
container.bind(AuthProvider).to(FirebaseAuthProvider);

container.load(...commentsContainers);
container.load(...pagesContainers);

container.bind(ProfileRepository).to(ProfileMongoRepository);

container.bind(UrlService).to(UrlServiceImpl);
container.bind(ImageService).to(ImageServiceImpl);
container.bind(ProfileService).to(ProfileServiceImpl);

export { container };
