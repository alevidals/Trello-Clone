import { BoardsList } from "@/components/boards-list";
import { Header } from "@/components/header";
import { getBoards } from "@/lib/services";

export default async function Home() {
	const boards = await getBoards();

	return (
		<>
			<Header />
			<main className="container mt-4">
				<h1 className="text-xl uppercase mb-4">Boards</h1>
				<BoardsList boards={boards} />
			</main>
		</>
	);
}
