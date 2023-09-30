import * as z from "zod";

export const UserValidation = z.object({
  username: z.string().min(3).max(25),
  bio: z.string().max(1000),
  age: z.number(),
  height: z.number(),
  weight: z.number(),
  relationshipstatus: z.string(),
  lookingfor: z.string(),
  gender: z.string(),
});
