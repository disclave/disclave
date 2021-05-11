import { UserModel } from "../models";

export interface SessionMessage {
  user: UserModel;
  authToken: string;
}
