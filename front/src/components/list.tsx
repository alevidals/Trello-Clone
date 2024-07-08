import type { getBoard } from "@/lib/services";

type Props = {
	list: Awaited<ReturnType<typeof getBoard>>["lists"][number];
};

export function List(props: Props) {
	const { list } = props;

	return (
		<div className="w-64 shrink-0 bg-zinc-900 rounded-xl p-4">
			<h2 className="font-semibold">{list.title}</h2>
		</div>
	);
}
