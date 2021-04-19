import { Container } from "inversify";
import "reflect-metadata";
import { CommentRepository } from "@/modules/comments/db";
import { CommentMongoRepository } from "@/modules/comments/db/CommentMongoRepository";
import { CommentService } from "@/modules/comments";
import { CommentServiceImpl } from "@/modules/comments/CommentServiceImpl";
import { UserMongoRepository } from "@/modules/users/db/UserMongoRepository";
import { UserRepository } from "@/modules/users/db";
import { UserService } from "@/modules/users";
import { UserServiceImpl } from "@/modules/users/UserServiceImpl";
import { UrlServiceImpl } from "@/modules/url/UrlServiceImpl";
import { UrlService } from "@/modules/url";
import { AuthProvider } from "@/modules/auth";
import { FirebaseAuthProvider } from "@/modules/auth/FirebaseAuthProvider";
import { EmailService } from "@/modules/email";
import { MailjetEmailService } from "@/modules/email/MailjetEmailService";

const container = new Container();

container.bind(EmailService).to(MailjetEmailService);
container.bind(AuthProvider).to(FirebaseAuthProvider);

container.bind(UserRepository).to(UserMongoRepository);
container.bind(CommentRepository).to(CommentMongoRepository);

container.bind(UrlService).to(UrlServiceImpl);
container.bind(UserService).to(UserServiceImpl);
container.bind(CommentService).to(CommentServiceImpl);

export { container };
