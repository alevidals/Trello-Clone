import { List } from "@/components/list";
import type { getBoard } from "@/services/boards";

type Props = {
	lists: Awaited<ReturnType<typeof getBoard>>["lists"];
};

export function Lists(props: Props) {
	const { lists } = props;

	return (
		<div className="flex overflow-auto gap-x-4 flex-1 pb-3 mb-3">
			{lists.map((list) => (
				<List key={list.id} list={list} />
			))}
		</div>
	);
}
