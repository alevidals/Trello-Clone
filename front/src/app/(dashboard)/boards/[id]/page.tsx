import { Lists } from "@/components/lists";
import { getBoard } from "@/services/boards";

type Props = {
	params: {
		id: string;
	};
};

export default async function BoardPage(props: Props) {
	const { params } = props;

	const board = await getBoard(params.id);

	return (
		<div className="h-full flex flex-col">
			<h1 className="text-3xl font-bold mb-4">{board.title}</h1>
			<Lists lists={board.lists} />
		</div>
	);
}
