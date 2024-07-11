import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type Props = {
	id: string;
	children: ReactNode;
	data?: Record<string, unknown>;
	className?: string;
};

export function Droppable(props: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id: props.id,
		data: props.data,
	});

	return (
		<div
			ref={setNodeRef}
			className={cn(props.className, {
				"shadow-2xl shadow-indigo-800/20 transition-shadow duration-300 ease-in-out":
					isOver,
			})}
		>
			{props.children}
		</div>
	);
}
