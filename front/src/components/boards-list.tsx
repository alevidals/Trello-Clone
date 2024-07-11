import type { Board } from "@/lib/types";
import Link from "next/link";

type Props = {
	boards: Board[];
};

export function BoardsList(props: Props) {
	const { boards } = props;

	return (
		<div className="flex flex-wrap gap-4">
			{boards.length > 0 ? (
				boards.map((board) => (
					<Link
						className="p-2 h-24 w-36 rounded-md border hover:border-white transition-colors duration-200"
						key={board.id}
						href={`/boards/${board.id}`}
					>
						<span className="text-sm ">{board.title}</span>
					</Link>
				))
			) : (
				<p>There are no boards, let's create the first one!</p>
			)}
		</div>
	);
}
