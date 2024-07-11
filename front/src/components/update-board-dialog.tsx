"use client";

import { updateBoard } from "@/app/(dashboard)/boards/_actions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { updateBoardFormSchema } from "@/lib/schemas";
import type {
	Board,
	UpdateBoardForm as UpdateBoardFormType,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
	open: boolean;
	board: Board;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

type UpdateBoardFormProps = {
	board: Board;
	setOpen: Dispatch<SetStateAction<boolean>>;
	className?: string;
};

export function UpdateBoardDialog(props: Props) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={props.open} onOpenChange={props.setOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Update board</DialogTitle>
					</DialogHeader>
					<UpdateBoardForm board={props.board} setOpen={props.setOpen} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={props.open} onOpenChange={props.setOpen}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Update board</DrawerTitle>
				</DrawerHeader>
				<UpdateBoardForm
					board={props.board}
					className="px-4"
					setOpen={props.setOpen}
				/>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function UpdateBoardForm(props: UpdateBoardFormProps) {
	const { setOpen, className } = props;

	const formRef = useRef<HTMLFormElement>(null);

	const form = useForm<UpdateBoardFormType>({
		resolver: zodResolver(updateBoardFormSchema),
		defaultValues: {
			title: props.board.title,
		},
	});

	async function handleSubmit(data: UpdateBoardFormType) {
		const { success, message } = await updateBoard({
			boardId: props.board.id,
			data,
		});

		if (success) {
			toast.success(message);
		} else {
			toast.error(message);
		}

		setOpen(false);
	}

	return (
		<Form {...form}>
			<form
				ref={formRef}
				className={cn("grid items-start gap-4", className)}
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Update board</Button>
			</form>
		</Form>
	);
}
