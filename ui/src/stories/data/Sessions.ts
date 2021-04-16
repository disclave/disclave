import { SessionModel } from "@/components/auth";
import { ExampleUserProfile } from "@/stories/data/UserProfiles";

export const ExampleSession: SessionModel = {
  uid: "mock-user-id",
  email: "user@example.com",
  emailVerified: true,
  profile: ExampleUserProfile,
};

export const ExampleSessionEmailNotVerified: SessionModel = {
  uid: "mock-user-id",
  email: "user@example.com",
  emailVerified: false,
  profile: null,
};

export const ExampleSessionNoProfile: SessionModel = {
  uid: "mock-user-id",
  email: "user@example.com",
  emailVerified: true,
  profile: null,
};
