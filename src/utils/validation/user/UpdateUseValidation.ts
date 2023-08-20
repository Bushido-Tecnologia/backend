import { z } from 'zod';

export const UpdateUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    id: z.string()
})