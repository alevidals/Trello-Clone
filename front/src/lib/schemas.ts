import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email().default(""),
	password: z.string().min(1).default(""),
});

export const registerFormSchema = z
	.object({
		email: z.string().email().default(""),
		password: z.string().min(1).default(""),
		confirmationPassword: z.string().min(1).default(""),
	})
	.refine((data) => data.password === data.confirmationPassword, {
		message: "Passwords do not match",
		path: ["password"],
	});
