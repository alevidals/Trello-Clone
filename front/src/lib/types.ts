import type {
	addBoardFormSchema,
	addCardFormSchema,
	addListFormSchema,
	loginFormSchema,
	registerFormSchema,
} from "@/lib/schemas";
import type { z } from "zod";

export type LoginForm = z.infer<typeof loginFormSchema>;
export type RegisterForm = z.infer<typeof registerFormSchema>;
export type AddBoardForm = z.infer<typeof addBoardFormSchema>;
export type AddCardForm = z.infer<typeof addCardFormSchema>;
export type AddListForm = z.infer<typeof addListFormSchema>;
