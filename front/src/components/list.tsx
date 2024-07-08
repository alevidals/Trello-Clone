import type { getBoard } from "@/services/boards";

type Props = {
	list: Awaited<ReturnType<typeof getBoard>>["lists"][number];
};

export function List(props: Props) {
	const { list } = props;

	return (
		<div className="w-64 shrink-0 rounded-lg p-3 border h-fit min-h-20">
			<h2 className="font-semibold mb-4">{list.title}</h2>
			<div className="flex flex-col gap-y-1">
				{list.cards.map((card) => (
					<div
						key={card.id}
						className="bg-background rounded-lg p-2 text-xs border"
					>
						{card.title}
					</div>
				))}
			</div>
		</div>
	);
}
