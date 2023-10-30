import * as z from "zod";

export const messageValidation = z.object({
  message: z.string().max(300),
});
