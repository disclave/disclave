import { UserProfileModel } from "@/components/auth/UserProfileModel";

export const ExampleUserProfile: UserProfileModel = {
  uid: "mock-user-id",
  name: "user-name",
};

export const ExampleUserProfileEmailNotVerified: UserProfileModel = {
  uid: "mock-user-id",
  name: "",
};

export const ExampleUserProfileWithFillPending: UserProfileModel = {
  uid: "mock-user-id",
  name: "",
};
