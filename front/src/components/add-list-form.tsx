"use client";

import { addList } from "@/app/(dashboard)/lists/_actions";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addListFormSchema } from "@/lib/schemas";
import type { AddListForm as AddListFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddListForm() {
	const params = useParams();

	const form = useForm<AddListFormType>({
		resolver: zodResolver(addListFormSchema),
		defaultValues: {
			title: "",
		},
	});

	async function handleSubmit(data: AddListFormType) {
		const { message, success } = await addList({
			data,
			boardId: params.id as string,
		});

		if (success) {
			toast.success(message);
		} else {
			toast.error(message);
		}

		form.reset();
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input className="w-64" placeholder="Add list" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</>
	);
}
