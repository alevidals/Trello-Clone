import { typedFetch } from "@/lib/utils";
import { cookies } from "next/headers";

type GetBoardsResponse = {
	id: string;
	title: string;
}[];

type Card = {
	id: string;
	title: string;
	description: string;
};

type List = {
	id: string;
	title: string;
	cards: Card[];
};

type GetBoardResponse = {
	id: string;
	title: string;
	lists: List[];
};

export async function getBoards() {
	const cookieStore = cookies();

	const response = await typedFetch<null, GetBoardsResponse>({
		url: `${process.env.BACK_URL}/api/v1/boards`,
		method: "GET",
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${cookieStore.get("access-token")?.value}`,
			},
		},
	});

	// TODO: redirect to error if response no ok
	if (!response.ok) {
		return [];
	}

	return response.data;
}

export async function getBoard(id: string) {
	const cookieStore = cookies();

	const response = await typedFetch<null, GetBoardResponse>({
		url: `${process.env.BACK_URL}/api/v1/boards/${id}`,
		method: "GET",
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${cookieStore.get("access-token")?.value}`,
			},
		},
	});

	// TODO: redirect to error if response no ok
	if (!response.ok) {
		return {} as GetBoardResponse;
	}

	return response.data;
}
