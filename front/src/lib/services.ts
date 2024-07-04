import { typedFetch } from "@/lib/utils";
import { cookies } from "next/headers";

type GetBoardResponse = {
	id: string;
	title: string;
}[];

export async function getBoards() {
	const cookiesStore = cookies();

	const response = await typedFetch<null, GetBoardResponse>({
		url: `${process.env.BACK_URL}/api/v1/boards`,
		method: "GET",
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${cookiesStore.get("access-token")?.value}`,
			},
		},
	});

	if (!response.ok) {
		return [];
	}

	return response.data;
}
