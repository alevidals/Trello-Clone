"use server";

import { addCardFormSchema, updateCardSchema } from "@/lib/schemas";
import type { AddCardForm, UpdateCard } from "@/lib/types";
import { typedFetch } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { z } from "zod";

type FormState = {
	message: string;
	success: boolean;
};

type AddCardRequest = {
	title: string;
	listId: string;
};

type AddUpdateCardResponse = {
	id: string;
	title: string;
	description: string | null;
	listId: string;
};

type UpdateCardRequest = z.infer<typeof updateCardSchema>;

type AddCardArgs = {
	data: AddCardForm;
	listId: string;
};

type UpdateCardArgs = {
	cardId: string;
	data: UpdateCard;
};

export async function addCard(args: AddCardArgs): Promise<FormState> {
	const { data, listId } = args;

	const parsed = addCardFormSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
		};
	}

	const cookieStore = cookies();

	const response = await typedFetch<AddCardRequest, AddUpdateCardResponse>({
		url: `${process.env.BACK_URL}/api/v1/cards`,
		method: "POST",
		body: {
			title: parsed.data.title,
			listId,
		},
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${cookieStore.get("access-token")?.value}`,
			},
		},
	});

	if (!response.ok) {
		return {
			message: response.error,
			success: false,
		};
	}

	revalidatePath("/");

	return {
		message: "Card added successfully",
		success: true,
	};
}

export async function deleteCard(id: string): Promise<FormState> {
	const cookieStore = cookies();

	const response = await typedFetch<null, null>({
		url: `${process.env.BACK_URL}/api/v1/cards/${id}`,
		method: "DELETE",
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${cookieStore.get("access-token")?.value}`,
			},
		},
	});

	if (!response.ok) {
		return {
			message: response.error,
			success: false,
		};
	}

	revalidatePath("/");

	return {
		message: "Card deleted successfully",
		success: true,
	};
}

export async function updateCard(args: UpdateCardArgs): Promise<FormState> {
	const parsed = updateCardSchema.safeParse(args.data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
		};
	}

	const cookieStore = cookies();

	const response = await typedFetch<UpdateCardRequest, AddUpdateCardResponse>({
		url: `${process.env.BACK_URL}/api/v1/cards/${args.cardId}`,
		method: "PATCH",
		body: {
			title: parsed.data.title,
			description: parsed.data.description,
			listId: parsed.data.title,
		},
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${cookieStore.get("access-token")?.value}`,
			},
		},
	});

	if (!response.ok) {
		return {
			message: response.error,
			success: false,
		};
	}

	revalidatePath("/");

	return {
		message: "Card updated successfully",
		success: true,
	};
}
