import { BoardsList } from "@/components/boards-list";
import { getBoards } from "@/services/boards";

export default async function Home() {
	const boards = await getBoards();

	return (
		<>
			<h1 className="text-xl uppercase mb-4">Boards</h1>
			<BoardsList boards={boards} />
		</>
	);
}
