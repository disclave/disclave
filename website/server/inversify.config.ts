import {Container} from "inversify";
import "reflect-metadata";
import {ICommentRepository} from "./comments/db";
import {TYPES} from "./types";
import {CommentRepository} from "./comments/db/CommentRepository";
import {ICommentService} from "./comments";
import {CommentService} from "./comments/CommentService";
import {UserRepository} from "./users/db/UserRepository";
import {IUserRepository} from "./users/db";
import {IUserService} from "./users";
import {UserService} from "./users/UserService";
import {UrlService} from "./url/UrlService";
import {IUrlService} from "./url";

const container = new Container()

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository)
container.bind<ICommentRepository>(TYPES.ICommentRepository).to(CommentRepository)

container.bind<IUrlService>(TYPES.IUrlService).to(UrlService)
container.bind<IUserService>(TYPES.IUserService).to(UserService)
container.bind<ICommentService>(TYPES.ICommentService).to(CommentService)

export {container}