import type {
	addBoardFormSchema,
	addCardFormSchema,
	addListFormSchema,
	loginFormSchema,
	registerFormSchema,
	updateCardSchema,
} from "@/lib/schemas";
import type { z } from "zod";

export type LoginForm = z.infer<typeof loginFormSchema>;
export type RegisterForm = z.infer<typeof registerFormSchema>;

export type AddBoardForm = z.infer<typeof addBoardFormSchema>;

export type AddCardForm = z.infer<typeof addCardFormSchema>;
export type UpdateCard = z.infer<typeof updateCardSchema>;

export type AddListForm = z.infer<typeof addListFormSchema>;

export type Card = {
	id: string;
	title: string;
	description: string;
	listId: string;
};

export type List = {
	id: string;
	title: string;
	cards: Card[];
};
