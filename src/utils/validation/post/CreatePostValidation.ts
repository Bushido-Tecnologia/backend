import { z } from "zod";

export const CreatePostSchema = z.object({
    title: z.string(),
    body: z.string(),
    base64: z.string(),
})

