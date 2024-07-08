import { List } from "@/components/list";
import { getBoard } from "@/lib/services";

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
			<div className="flex overflow-auto gap-x-4 flex-1 pb-3 mb-3">
				{board.lists.map((list) => (
					<List key={list.id} list={list} />
				))}
			</div>
		</div>
	);
}
