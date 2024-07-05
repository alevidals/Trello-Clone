import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export const registerFormSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(1),
		confirmationPassword: z.string().min(1),
	})
	.refine((data) => data.password === data.confirmationPassword, {
		message: "Passwords do not match",
		path: ["password"],
	});

export const addBoardFormSchema = z.object({
	title: z.string().min(1),
});
