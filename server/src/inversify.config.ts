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

const container = new Container();

container.bind(EmailService).to(MailjetEmailService);

container.bind(ProfileRepository).to(ProfileMongoRepository);
container.bind(CommentRepository).to(CommentMongoRepository);

container.bind(UrlService).to(UrlServiceImpl);
container.bind(ProfileService).to(ProfileServiceImpl);
container.bind(CommentService).to(CommentServiceImpl);

export { container };
