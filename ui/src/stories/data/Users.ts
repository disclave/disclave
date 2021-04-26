import { UserModel } from "@/components/auth";
import { ExampleUserProfile } from "@/stories/data/UserProfiles";

export const ExampleSession: UserModel = {
  email: "user@example.com",
};

export const ExampleSessionEmailNotVerified: UserModel = {
  email: "user@example.com",
};

export const ExampleSessionNoProfile: UserModel = {
  email: "user@example.com",
};
