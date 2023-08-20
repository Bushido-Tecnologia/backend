import { z } from "zod";

export const UpdatePostSchema = z.object({
    title: z.string(),
    body: z.string(),
    base64: z.string(),
    id: z.string()
})