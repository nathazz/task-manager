import { clerkClient } from "@clerk/express";
import { userRepository } from "../repository/user.repository.js";

export const userService = {
  async resolveByClerkId(clerkId: string) {
    const clerkUser = await clerkClient.users.getUser(clerkId);

    const email = clerkUser.emailAddresses.find(
      (address) => address.id === clerkUser.primaryEmailAddressId,
    )?.emailAddress;

    if (!email) {
      throw new Error("Clerk user has no primary email");
    }

    return userRepository.upsertByClerkId({
      clerkId,
      email,
    });
  },
};
