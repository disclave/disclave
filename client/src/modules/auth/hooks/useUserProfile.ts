// import { useEffect, useState } from "react";
// import { UserModel, UserProfileModel } from "../";
// import { getSelfProfile } from "../../modules/users";
// import { useUser } from "./";
//
// type UpdateProfile = () => Promise<void>;
// type UseUserProfile = [UserProfileModel | null, UpdateProfile];
//
// interface PartialProfile {
//   name: string;
// }

export const useUserProfile = () /*: UseUserProfile*/ => {
  // const {user} = useUser();
  // const [profile, setProfile] = useState<UserProfileModel | null>(null);
  //
  // const mapToProfile = (user: UserModel, partial: PartialProfile) => {
  //   setProfile({
  //     uid: user.uid,
  //     email: user.email,
  //     name: partial != null ? partial.name : "",
  //     emailVerified: user.emailVerified,
  //     profileFillPending: partial == null,
  //   });
  // };
  //
  // const fetchUserProfile = async (user: UserModel, noCache: boolean) => {
  //   const result = await getSelfProfile(noCache);
  //   mapToProfile(user, result);
  // };
  //
  // const updateProfile: UpdateProfile = async () => {
  //   if (!user) return;
  //   await fetchUserProfile(user, true);
  // };
  //
  // useEffect(() => {
  //   if (!user) {
  //     setProfile(null);
  //     return;
  //   }
  //
  //   fetchUserProfile(user, false);
  // }, [user]);
  //
  // return [profile, updateProfile];
};
