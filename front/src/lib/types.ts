import type {
	addBoardFormSchema,
	loginFormSchema,
	registerFormSchema,
} from "@/lib/schemas";
import type { z } from "zod";

export type LoginForm = z.infer<typeof loginFormSchema>;
export type RegisterForm = z.infer<typeof registerFormSchema>;
export type AddBoardForm = z.infer<typeof addBoardFormSchema>;
