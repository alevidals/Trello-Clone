"use client";

import { login } from "@/app/(auth)/_actions";
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
import { loginFormSchema } from "@/lib/schemas";
import type { LoginForm as LoginFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
	const formRef = useRef<HTMLFormElement>(null);

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleSubmit(data: LoginFormType) {
		const result = await login(data);

		if (result && !result.success) {
			toast.error(result.message);
		}
	}

	return (
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
				<Button>Login</Button>
			</form>
		</Form>
	);
}
