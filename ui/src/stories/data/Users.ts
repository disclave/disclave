import { UserModel } from "@/components/auth";
import { ExampleUserProfile } from "@/stories/data/UserProfiles";

export const ExampleUser: UserModel = {
  uid: "user-id",
  email: "user@example.com",
  emailVerified: true,
  profile: ExampleUserProfile,
};

export const ExampleUserEmailNotVerified: UserModel = {
  uid: "user-id",
  email: "user@example.com",
  emailVerified: false,
  profile: null,
};

export const ExampleUserNoProfile: UserModel = {
  uid: "user-id",
  email: "user@example.com",
  emailVerified: true,
  profile: null,
};
