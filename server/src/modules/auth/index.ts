export type { Session } from "./models/Session";

export type UserId = string & { readonly type: unique symbol };
export const asUserId = (value: string) => value as UserId;
