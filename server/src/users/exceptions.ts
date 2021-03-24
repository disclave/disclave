import { Exception } from "../exceptions";

export const UsernameMinLength = (message?: string) =>
  new Exception("username/min-length", message);
export const UsernameMaxLength = (message?: string) =>
  new Exception("username/max-length", message);
export const UsernameInvalidCharacters = (message?: string) =>
  new Exception("username/invalid-characters", message);
export const UsernameTaken = (message?: string) =>
  new Exception("username/taken", message);
