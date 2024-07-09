"use client";

import { deleteList, editList } from "@/app/(dashboard)/lists/_actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { addListFormSchema } from "@/lib/schemas";
import type { AddListForm } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { getBoard } from "@/services/boards";
import { zodResolver } from "@hookform/resolvers/zod";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
	list: Awaited<ReturnType<typeof getBoard>>["lists"][number];
};

type EditOrDeleteListDialogProps = {
	list: Awaited<ReturnType<typeof getBoard>>["lists"][number];
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

type EditListFormProps = {
	list: Awaited<ReturnType<typeof getBoard>>["lists"][number];
	setOpen: Dispatch<SetStateAction<boolean>>;
	className?: string;
};

function EditListForm(props: EditListFormProps) {
	const { list, className, setOpen } = props;

	const form = useForm<AddListForm>({
		resolver: zodResolver(addListFormSchema),
		defaultValues: list,
	});

	async function handleSubmit(data: AddListForm) {
		const { success, message } = await editList({
			data,
			listId: list.id,
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
				<Button type="submit">Edit list</Button>
			</form>
		</Form>
	);
}

function EditListDialog(props: EditOrDeleteListDialogProps) {
	const { list, open, setOpen } = props;

	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add board</DialogTitle>
					</DialogHeader>
					<EditListForm list={list} setOpen={setOpen} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Add board</DrawerTitle>
				</DrawerHeader>
				<EditListForm className="px-4" list={list} setOpen={setOpen} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function DeleteListDialog(props: EditOrDeleteListDialogProps) {
	const { list, open, setOpen } = props;

	const isDesktop = useMediaQuery("(min-width: 768px)");

	async function handleDeleteList() {
		const { message, success } = await deleteList(list.id);

		if (success) {
			toast.success(message);
		} else {
			toast.error(message);
		}
	}

	if (isDesktop) {
		return (
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you absolutely sure you want to delete this list?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDeleteList}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>
						Are you absolutely sure you want to delete this card?
					</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>
				<Button className="mx-4" onClick={handleDeleteList}>
					Delete
				</Button>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export function ListDropdown(props: Props) {
	const { list } = props;

	const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
	const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="icon" variant="ghost">
						<DotsHorizontalIcon className="h-3 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setIsOpenEditDialog(true)}>
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsOpenConfirmDialog(true)}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeleteListDialog
				list={list}
				open={isOpenConfirmDialog}
				setOpen={setIsOpenConfirmDialog}
			/>
			<EditListDialog
				list={list}
				open={isOpenEditDialog}
				setOpen={setIsOpenEditDialog}
			/>
		</>
	);
}
