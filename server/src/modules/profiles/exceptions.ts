import { ApolloError } from "apollo-server-errors";

export const UsernameMinLength = (message: string) =>
  new ApolloError(message, "username/min-length");
export const UsernameMaxLength = (message: string) =>
  new ApolloError(message, "username/max-length");
export const UsernameInvalidCharacters = (message: string) =>
  new ApolloError(message, "username/invalid-characters");
export const UsernameNotAllowed = (message: string) =>
  new ApolloError(message, "username/not-allowed");
export const UsernameTaken = (message: string) =>
  new ApolloError(message, "username/taken");

export const ProfileAlreadyExists = (message: string) =>
  new ApolloError(message, "profile/already-exists");
export const ProfileEmailNotVerified = (message: string) =>
  new ApolloError(message, "profile/email-not-verified");

  export const ProfileUserAccountDisabled = (message: string) =>
  new ApolloError(message, "profile/user-account-disabled");

