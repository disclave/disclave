import { Container } from "inversify";
import "reflect-metadata";
import { CommentRepository } from "./comments/db";
import { CommentMongoRepository } from "./comments/db/CommentMongoRepository";
import { CommentService } from "./comments";
import { CommentServiceImpl } from "./comments/CommentServiceImpl";
import { UserMongoRepository } from "./users/db/UserMongoRepository";
import { UserRepository } from "./users/db";
import { UserService } from "./users";
import { UserServiceImpl } from "./users/UserServiceImpl";
import { UrlServiceImpl } from "./url/UrlServiceImpl";
import { UrlService } from "./url";
import { AuthProvider } from "./auth";
import { FirebaseAuthProvider } from "./auth/FirebaseAuthProvider";
import { EmailService } from "./email";
import { MailjetEmailService } from "./email/MailjetEmailService";

const container = new Container();

container.bind(EmailService).to(MailjetEmailService);
container.bind(AuthProvider).to(FirebaseAuthProvider);

container.bind(UserRepository).to(UserMongoRepository);
container.bind(CommentRepository).to(CommentMongoRepository);

container.bind(UrlService).to(UrlServiceImpl);
container.bind(UserService).to(UserServiceImpl);
container.bind(CommentService).to(CommentServiceImpl);

export { container };
