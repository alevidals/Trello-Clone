import { AddCardForm } from "@/components/add-card-form";
import { AddListForm } from "@/components/add-list-form";
import { DeleteCardButton } from "@/components/detele-card-button";
import { ListDropdown } from "@/components/list-dropdown";
import type { getBoard } from "@/services/boards";

type ListsProps = {
	lists: Awaited<ReturnType<typeof getBoard>>["lists"];
};

type ListProps = {
	list: Awaited<ReturnType<typeof getBoard>>["lists"][number];
};

export function List(props: ListProps) {
	const { list } = props;

	return (
		<div className="w-64 shrink-0 rounded-md p-3 border h-fit min-h-20">
			<div className="flex items-center justify-between mb-4">
				<h2 className="font-semibold">{list.title}</h2>
				<ListDropdown list={list} />
			</div>
			<div className="flex flex-col gap-y-1">
				{list.cards.map((card) => (
					<div
						key={card.id}
						className="bg-background rounded-md p-2 text-xs border flex items-center justify-between"
					>
						<span>{card.title}</span>
						<DeleteCardButton id={card.id} />
					</div>
				))}
				<AddCardForm id={list.id} />
			</div>
		</div>
	);
}

export function Lists(props: ListsProps) {
	const { lists } = props;

	return (
		<div className="flex overflow-auto gap-x-4 flex-1 pb-3 mb-3 pt-1">
			{lists.map((list) => (
				<List key={list.id} list={list} />
			))}
			<AddListForm />
		</div>
	);
}
