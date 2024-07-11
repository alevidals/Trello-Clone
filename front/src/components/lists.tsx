"use client";

import { updateCard } from "@/app/(dashboard)/cards/_actions";
import { AddCardForm } from "@/components/add-card-form";
import { AddListForm } from "@/components/add-list-form";
import { DeleteCardButton } from "@/components/detele-card-button";
import { Draggable } from "@/components/draggable";
import { Droppable } from "@/components/droppable";
import { ListDropdown } from "@/components/list-dropdown";
import type { Card, List as ListType } from "@/lib/types";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { toast } from "sonner";

type ListsProps = {
	lists: ListType[];
};

type ListProps = {
	list: ListType;
};

export function List(props: ListProps) {
	const { list } = props;

	return (
		<Droppable
			id={list.id}
			data={list}
			className="w-64 shrink-0 rounded-md p-3 border h-fit min-h-20"
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="font-semibold">{list.title}</h2>
				<ListDropdown list={list} />
			</div>
			<div className="flex flex-col gap-y-2">
				{list.cards.map((card) => (
					<Draggable
						key={card.id}
						id={card.id}
						data={card}
						className="bg-background rounded-md p-2 text-xs border flex items-center justify-between"
					>
						<span>{card.title}</span>
						<DeleteCardButton id={card.id} />
					</Draggable>
				))}
				<AddCardForm id={list.id} />
			</div>
		</Droppable>
	);
}

export function Lists(props: ListsProps) {
	const { lists } = props;

	async function handleDragEnd(event: DragEndEvent) {
		const activeId = event.active.id.toString();
		const activeData = event.active.data.current as Card;
		const overId = event.over?.id.toString();

		if (!overId || activeData.listId === overId) return;

		const { message, success } = await updateCard({
			cardId: activeId,
			data: {
				title: activeData.title,
				description: activeData.description,
				listId: overId,
			},
		});

		if (success) {
			toast.success(message);
		} else {
			toast.error(message);
		}
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className="flex overflow-auto gap-x-4 flex-1 pb-3 mb-3 pt-1">
				{lists.map((list) => (
					<List key={list.id} list={list} />
				))}
				<AddListForm />
			</div>
		</DndContext>
	);
}
