import { z } from "zod";

export const CreateVoluntarySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.number()
})