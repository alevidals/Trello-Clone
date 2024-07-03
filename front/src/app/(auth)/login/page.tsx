"use client";

import { login } from "@/app/(auth)/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import type { LoginForm } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export default function LoginPage() {
	const [state, formAction] = useFormState(login, {
		message: "",
	});

	const formRef = useRef<HTMLFormElement>(null);

	const form = useForm<LoginForm>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<>
			{state.message ? (
				<Alert variant="destructive" className="w-fit mb-4">
					<ExclamationTriangleIcon className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{state.message}</AlertDescription>
				</Alert>
			) : null}
			<Form {...form}>
				<form
					ref={formRef}
					className="space-y-3"
					onSubmit={(event) => {
						event.preventDefault();
						form.handleSubmit(() =>
							formAction(new FormData(formRef.current as HTMLFormElement)),
						)(event);
					}}
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
		</>
	);
}
