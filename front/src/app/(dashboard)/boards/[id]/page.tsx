import { DeleteBoardButton } from "@/components/delete-board-button";
import { Lists } from "@/components/lists";
import { UpdateBoardButton } from "@/components/update-board-button";
import { getBoard } from "@/services/boards";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const id = props.params.id;

	const board = await getBoard(props.params.id);

	return {
		title: `Board - ${board.title}`,
	};
}

export default async function BoardPage(props: Props) {
	const { params } = props;

	const board = await getBoard(params.id);

	return (
		<div className="h-full flex flex-col">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold mb-4">{board.title}</h1>
				<div className="flex items-center gap-x-2">
					<UpdateBoardButton board={board} />
					<DeleteBoardButton id={params.id} />
				</div>
			</div>
			<Lists lists={board.lists} />
		</div>
	);
}
