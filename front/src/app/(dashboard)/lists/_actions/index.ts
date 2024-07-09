"use server";

import { addListFormSchema } from "@/lib/schemas";
import type { AddListForm } from "@/lib/types";
import { typedFetch } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type FormState = {
	message: string;
	success: boolean;
};

type AddListArgs = {
	data: AddListForm;
	boardId: string;
};

type EditListArgs = {
	data: AddListForm;
	listId: string;
};

type AddListRequest = {
	title: string;
	boardId: string;
};

type AddListResponse = {
	id: string;
	title: string;
	boardId: string;
};

type EditListRequest = {
	title: string;
};

type EditListResponse = {
	id: string;
	title: string;
	boardId: string;
};

export async function addList(args: AddListArgs): Promise<FormState> {
	const { data, boardId } = args;

	const parsed = addListFormSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
		};
	}

	const cookieStore = cookies();

	const response = await typedFetch<AddListRequest, AddListResponse>({
		url: `${process.env.BACK_URL}/api/v1/lists`,
		method: "POST",
		body: {
			title: parsed.data.title,
			boardId,
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
		message: "List added successfully",
		success: true,
	};
}

export async function deleteList(id: string): Promise<FormState> {
	const cookieStore = cookies();

	const response = await typedFetch<null, null>({
		url: `${process.env.BACK_URL}/api/v1/lists/${id}`,
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
		message: "List deleted successfully",
		success: true,
	};
}

export async function editList(args: EditListArgs): Promise<FormState> {
	const { data, listId } = args;

	const parsed = addListFormSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
		};
	}

	const cookieStore = cookies();

	const response = await typedFetch<EditListRequest, EditListRequest>({
		url: `${process.env.BACK_URL}/api/v1/lists/${listId}`,
		method: "PATCH",
		body: {
			title: parsed.data.title,
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
		message: "List updated successfully",
		success: true,
	};
}
