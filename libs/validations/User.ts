import * as z from "zod";

export const UserValidation = z.object({
  username: z.string().min(3).max(25),
  bio: z.string().max(1000),
  age: z.coerce.number(),
  height: z.object({ feet: z.coerce.number(), inches: z.coerce.number() }),
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

export const PreferencesValidation = z.object({
  gender: z.array(z.string()),
  age: z.object({ min: z.number().min(18), max: z.number().min(18) }),
  distance: z.number().min(50),
  desires: z.array(z.string()),
});
