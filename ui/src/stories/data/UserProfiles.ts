import { UserProfileModel } from "../../components/auth/UserProfileModel";

export const ExampleUserProfile: UserProfileModel = {
  uid: "mock-user-id",
  email: "example@domain.com",
  name: "user-name",
  profileFillPending: false,
};

export const ExampleUserProfileWithFillPending: UserProfileModel = {
  uid: "mock-user-id",
  email: "example@domain.com",
  name: "",
  profileFillPending: true,
};
