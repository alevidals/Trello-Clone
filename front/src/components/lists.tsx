"use client";

import { updateCard } from "@/app/(dashboard)/cards/_actions";
import { AddCardForm } from "@/components/add-card-form";
import { AddListForm } from "@/components/add-list-form";
import { Card } from "@/components/card";
import { Droppable } from "@/components/droppable";
import { ListDropdown } from "@/components/list-dropdown";
import type { Card as CardType, List as ListType } from "@/lib/types";
import {
	DndContext,
	type DragEndEvent,
	type DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { toast } from "sonner";

type ListsProps = {
	lists: ListType[];
};

type ListProps = {
	list: ListType;
	activeId?: string;
};

export function List(props: ListProps) {
	return (
		<Droppable
			id={props.list.id}
			data={props.list}
			className="w-64 shrink-0 rounded-md p-3 border h-fit min-h-20"
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="font-semibold">{props.list.title}</h2>
				<ListDropdown list={props.list} />
			</div>
			<div className="flex flex-col gap-y-2">
				{props.list.cards.map((card) => (
					<Card key={card.id} card={card} active={card.id === props.activeId} />
				))}
				<AddCardForm id={props.list.id} />
			</div>
		</Droppable>
	);
}

export function Lists(props: ListsProps) {
	const { lists } = props;

	const [activeId, setActiveId] = useState<string>();

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	function handleDragStart(event: DragStartEvent) {
		setActiveId(event.active.id.toString());
	}

	async function handleDragEnd(event: DragEndEvent) {
		const activeId = event.active.id.toString();
		const activeData = event.active.data.current as CardType;
		const overId = event.over?.id.toString();

		setActiveId(undefined);
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
		<DndContext
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className="flex overflow-auto gap-x-4 flex-1 pb-3 mb-3 pt-1">
				{lists.map((list) => (
					<List key={list.id} list={list} activeId={activeId} />
				))}
				<AddListForm />
			</div>
		</DndContext>
	);
}
