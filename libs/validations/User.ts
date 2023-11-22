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
  pronouns: z.string(),
  pets: z.string(),
  kids: z.string(),
  alcohol: z.string(),
  smoking: z.string(),
  marijuana: z.string(),
  religion: z.string(),
  politicalViews: z.string(),
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
  relationshipstatus: z.array(z.string()),
  race: z.array(z.string()),
  sexualOrientation: z.array(z.string()),
  pets: z.array(z.string()),
  kids: z.array(z.string()),
  alcohol: z.array(z.string()),
  smoking: z.array(z.string()),
  marijuana: z.array(z.string()),
  religion: z.array(z.string()),
  politicalViews: z.array(z.string()),
});
