"use server";

import { addBoardFormSchema } from "@/lib/schemas";
import type { AddBoardForm } from "@/lib/types";
import { typedFetch } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormState = {
	message: string;
	success: boolean;
};

type AddBoardRequest = {
	title: string;
};

type AddBoardResponse = {
	id: string;
	title: string;
};

export async function addBoard(data: AddBoardForm): Promise<FormState> {
	const parsed = addBoardFormSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
		};
	}

	const cookiesStore = cookies();

	const response = await typedFetch<AddBoardRequest, AddBoardResponse>({
		url: `${process.env.BACK_URL}/api/v1/boards`,
		method: "POST",
		body: {
			title: parsed.data.title,
		},
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${cookiesStore.get("access-token")?.value}`,
			},
		},
	});

	if (!response.ok) {
		return {
			message: response.error,
			success: false,
		};
	}

	redirect(`/boards/${response.data.id}`);
}
