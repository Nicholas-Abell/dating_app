import * as z from 'zod';

export const UserValidation = z.object({
    // id: z.string(),
    username: z.string().min(3).max(25),
    bio: z.string().max(1000),
})