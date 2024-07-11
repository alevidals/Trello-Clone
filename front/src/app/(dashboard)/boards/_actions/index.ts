"use server";

import { addBoardFormSchema, updateBoardFormSchema } from "@/lib/schemas";
import type { AddBoardForm, UpdateBoardForm } from "@/lib/types";
import { typedFetch } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod";

type FormState = {
	message: string;
	success: boolean;
};

type AddBoardRequest = {
	title: string;
};

type AddUpdateBoardResponse = {
	id: string;
	title: string;
};

type UpdateBoardArgs = {
	boardId: string;
	data: UpdateBoardForm;
};

type UpdateBoardRequest = z.infer<typeof updateBoardFormSchema>;

export async function addBoard(data: AddBoardForm): Promise<FormState> {
	const parsed = addBoardFormSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
		};
	}

	const cookiesStore = cookies();

	const response = await typedFetch<AddBoardRequest, AddUpdateBoardResponse>({
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

export async function updateBoard(args: UpdateBoardArgs): Promise<FormState> {
	const parsed = updateBoardFormSchema.safeParse(args.data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
		};
	}

	const cookiesStore = cookies();

	const response = await typedFetch<UpdateBoardRequest, null>({
		url: `${process.env.BACK_URL}/api/v1/boards/${args.boardId}`,
		method: "PATCH",
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

	revalidatePath("/");

	return {
		message: "Board updated successfully",
		success: true,
	};
}

export async function deleteBoard(id: string): Promise<FormState> {
	const cookiesStore = cookies();

	const response = await typedFetch<AddBoardRequest, AddUpdateBoardResponse>({
		url: `${process.env.BACK_URL}/api/v1/boards/${id}`,
		method: "DELETE",
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

	redirect("/");
}
