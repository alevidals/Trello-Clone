"use client";

import { addBoard } from "@/app/actions";
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
import { addBoardFormSchema } from "@/lib/schemas";
import type { AddBoardForm as AddBoardFormType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

type AddBoardFormProps = {
	setOpen: Dispatch<SetStateAction<boolean>>;
	className?: string;
};

export function AddBoardDialog(props: Props) {
	const { open, setOpen } = props;

	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add board</DialogTitle>
					</DialogHeader>
					<AddBoardForm setOpen={setOpen} />
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
				<AddBoardForm className="px-4" setOpen={setOpen} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function AddBoardForm(props: AddBoardFormProps) {
	const { setOpen, className } = props;

	const formRef = useRef<HTMLFormElement>(null);

	const form = useForm<AddBoardFormType>({
		resolver: zodResolver(addBoardFormSchema),
		defaultValues: {
			title: "",
		},
	});

	async function handleSubmit(data: AddBoardFormType) {
		const { message, success } = await addBoard(data);

		if (success) {
			toast.success(message);
		} else {
			toast.error(message);
			return;
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
				<Button type="submit">Create board</Button>
			</form>
		</Form>
	);
}
