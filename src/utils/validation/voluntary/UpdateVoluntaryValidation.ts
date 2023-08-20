import { z } from "zod";

export const UpdateVoluntarySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.number(),
    id: z.string()
})