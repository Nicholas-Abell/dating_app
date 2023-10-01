import * as z from "zod";

const messageValidation = {
  message: z.string().max(300),
};
