import type {
	addBoardFormSchema,
	addCardFormSchema,
	addListFormSchema,
	loginFormSchema,
	registerFormSchema,
	updateBoardFormSchema,
	updateCardSchema,
} from "@/lib/schemas";
import type { getBoards } from "@/services/boards";
import type { z } from "zod";

export type LoginForm = z.infer<typeof loginFormSchema>;
export type RegisterForm = z.infer<typeof registerFormSchema>;

export type AddBoardForm = z.infer<typeof addBoardFormSchema>;
export type UpdateBoardForm = z.infer<typeof updateBoardFormSchema>;

export type AddCardForm = z.infer<typeof addCardFormSchema>;
export type UpdateCard = z.infer<typeof updateCardSchema>;

export type AddListForm = z.infer<typeof addListFormSchema>;

export type Board = Awaited<ReturnType<typeof getBoards>>[number];

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
