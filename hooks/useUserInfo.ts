import { fetchUser } from "@/libs/actions/user.actions";
import User from "@/libs/models/user.model";
import { currentUser } from "@clerk/nextjs";

export async function useUserInfo() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user?.id);
  return userInfo as typeof User;
}
