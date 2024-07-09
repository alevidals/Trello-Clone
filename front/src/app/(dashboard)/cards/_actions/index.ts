"use server";

import { addCardFormSchema } from "@/lib/schemas";
import type { AddCardForm } from "@/lib/types";
import { typedFetch } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type FormState = {
	message: string;
	success: boolean;
};

type AddCardRequest = {
	title: string;
	listId: string;
};

type AddCardResponse = {
	id: string;
	title: string;
	description: string | null;
	listId: string;
};

type AddCardArgs = {
	data: AddCardForm;
	listId: string;
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

	const response = await typedFetch<AddCardRequest, AddCardResponse>({
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
