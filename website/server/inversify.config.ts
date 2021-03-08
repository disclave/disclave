import {Container} from "inversify";
import "reflect-metadata";
import {CommentRepository} from "./comments/db";
import {CommentFirestoreRepository} from "./comments/db/CommentFirestoreRepository";
import {CommentService} from "./comments";
import {CommentServiceImpl} from "./comments/CommentServiceImpl";
import {UserFirestoreRepository} from "./users/db/UserFirestoreRepository";
import {UserRepository} from "./users/db";
import {UserService} from "./users";
import {UserServiceImpl} from "./users/UserServiceImpl";
import {UrlServiceImpl} from "./url/UrlServiceImpl";
import {UrlService} from "./url";

const container = new Container()

container.bind(UserRepository).to(UserFirestoreRepository)
container.bind(CommentRepository).to(CommentFirestoreRepository)

container.bind(UrlService).to(UrlServiceImpl)
container.bind(UserService).to(UserServiceImpl)
container.bind(CommentService).to(CommentServiceImpl)

export {container}