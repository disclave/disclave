import { UserProfileModel } from "@/components/auth/UserProfileModel";

export const ExampleUserProfile: UserProfileModel = {
  uid: "mock-user-id",
  email: "example@domain.com",
  name: "user-name",
  emailVerified: true,
  profileFillPending: false,
};

export const ExampleUserProfileEmailNotVerified: UserProfileModel = {
  uid: "mock-user-id",
  email: "example@domain.com",
  name: "",
  emailVerified: false,
  profileFillPending: true,
};

export const ExampleUserProfileWithFillPending: UserProfileModel = {
  uid: "mock-user-id",
  email: "example@domain.com",
  name: "",
  emailVerified: true,
  profileFillPending: true,
};
