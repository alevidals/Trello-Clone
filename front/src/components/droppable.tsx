import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type Props = {
	id: string;
	children: ReactNode;
	data?: Record<string, unknown>;
	className?: string;
};

export function Droppable(props: Props) {
	const { setNodeRef } = useDroppable({
		id: props.id,
		data: props.data,
	});

	return (
		<div ref={setNodeRef} className={props.className}>
			{props.children}
		</div>
	);
}
