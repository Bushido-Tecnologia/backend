import { z } from "zod";

export const CreateEnrollmentSchema = z.object({
    name: z.string(),
    email: z.string().email()
})
