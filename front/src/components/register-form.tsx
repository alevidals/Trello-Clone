"use client";

import { register } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/lib/schemas";
import type { RegisterForm as RegisterFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function RegisterForm() {
	const formRef = useRef<HTMLFormElement>(null);

	const form = useForm<RegisterFormType>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmationPassword: "",
		},
	});

	async function handleSubmit(data: RegisterFormType) {
		const result = await register(data);

		if (result && !result.success) {
			toast.error(result.message);
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					ref={formRef}
					className="space-y-3"
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmationPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password confirmation</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button>Register</Button>
				</form>
			</Form>
		</>
	);
}
