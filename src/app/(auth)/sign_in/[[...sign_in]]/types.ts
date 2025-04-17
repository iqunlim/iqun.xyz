import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 charactrers log " }),
});

export type LoginInformation = z.infer<typeof LoginSchema>;
