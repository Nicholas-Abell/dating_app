import * as z from "zod";

export const UserValidation = z.object({
  username: z.string().min(3).max(25),
  bio: z.string().max(1000),
  age: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
  relationshipstatus: z.string(),
  lookingfor: z.string(),
  sexualOrientation: z.string(),
  gender: z.string(),
  race: z.string(),
});

export const LocationValidation = z.object({
  latitude: z.number(),
  longitude: z.number(),
  city: z.string(),
});
