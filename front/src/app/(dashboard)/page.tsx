import { BoardsList } from "@/components/boards-list";
import { getBoards } from "@/services/boards";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Boards",
	description: "Boards page for Trello Clone",
};

export default async function Home() {
	const boards = await getBoards();

	return (
		<>
			<h1 className="text-xl uppercase mb-4">Boards</h1>
			<BoardsList boards={boards} />
		</>
	);
}
