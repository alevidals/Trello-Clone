import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email().default(""),
	password: z.string().min(1).default(""),
});
