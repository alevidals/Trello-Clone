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

export const addCardFormSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	listId: z.string().optional(),
});

export const updateCardSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	listId: z.string().nullable(),
});

export const addListFormSchema = z.object({
	title: z.string(),
});
