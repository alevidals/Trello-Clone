import { useDraggable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type Props = {
	id: string;
	children: ReactNode;
	data?: Record<string, unknown>;
	className?: string;
};

export function Draggable(props: Props) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: props.id,
		data: props.data,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined;

	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className={props.className}
		>
			{props.children}
		</div>
	);
}
