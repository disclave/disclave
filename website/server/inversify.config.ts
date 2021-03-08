import {Container} from "inversify";
import "reflect-metadata";
import {ICommentRepository} from "./comments/db";
import {TYPES} from "./types";
import {CommentRepository} from "./comments/db/CommentRepository";
import {ICommentService} from "./comments";
import {CommentService} from "./comments/CommentService";

const container = new Container()

container.bind<ICommentRepository>(TYPES.ICommentRepository).to(CommentRepository)
container.bind<ICommentService>(TYPES.ICommentService).to(CommentService)

export {container}