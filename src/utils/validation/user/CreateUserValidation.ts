import { z } from 'zod';

export const CreateUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
})