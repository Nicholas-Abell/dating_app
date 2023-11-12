import * as z from "zod";

export const MessageValidation = z.object({
  content: z.string().min(1).max(150),
});
