"use client";

import { addCard } from "@/app/(dashboard)/cards/_actions";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCardFormSchema } from "@/lib/schemas";
import type { AddCardForm as AddCardFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
	id: string;
};

export function AddCardForm(props: Props) {
	const { id } = props;

	const formRef = useRef<HTMLFormElement>(null);

	const form = useForm<AddCardFormType>({
		resolver: zodResolver(addCardFormSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	async function handleSubmit(data: AddCardFormType) {
		if (!data.title) {
			toast.error("The card title couldn't be empty");
			return;
		}

		const { success, message } = await addCard({
			data,
			listId: id,
		});

		if (success) {
			toast.success(message);
		} else {
			toast.error(message);
		}

		form.reset();
	}

	return (
		<Form {...form}>
			<form
				ref={formRef}
				className="space-y-3 pt-2"
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<Input placeholder="Add card" className="peer" {...field} />
									<FormMessage className="hidden peer-focus:block" />
								</>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
