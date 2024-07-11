import { DeleteCardButton } from "@/components/detele-card-button";
import { Draggable } from "@/components/draggable";
import type { Card as CardType } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
	card: CardType;
	active: boolean;
};

export function Card(props: Props) {
	return (
		<Draggable
			key={props.card.id}
			id={props.card.id}
			data={props.card}
			className={cn(
				"bg-background rounded-md p-2 text-xs border flex items-center justify-between",
				{
					"shadow-2xl shadow-foreground/20 transition-shadow duration-300 ease-in-out z-50 cursor-grabbing":
						props.active,
				},
			)}
		>
			<span>{props.card.title}</span>
			<DeleteCardButton id={props.card.id} />
		</Draggable>
	);
}
