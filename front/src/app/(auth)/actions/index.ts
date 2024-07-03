"use server";

import {
	ACCESS_TOKEN_EXPIRATION,
	REFRESH_TOKEN_EXPIRATION,
} from "@/lib/constants";
import { loginFormSchema, registerFormSchema } from "@/lib/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormState = {
	message: string;
};

export async function login(
	prevState: FormState,
	data: FormData,
): Promise<FormState> {
	const formData = Object.fromEntries(data);
	const parsed = loginFormSchema.safeParse(formData);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
		};
	}

	const response = await fetch(`${process.env.BACK_URL}/api/v1/auth/login`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			email: parsed.data.email,
			password: parsed.data.password,
		}),
	});

	if (!response.ok) {
		const { message } = await response.json();

		return {
			message: message || "Unexpected error",
		};
	}

	const { accessToken, refreshToken } = await response.json();

	const cookieStore = cookies();

	cookieStore.set("access-token", accessToken, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		expires: new Date().getTime() + ACCESS_TOKEN_EXPIRATION,
	});
	cookieStore.set("refresh-token", refreshToken, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		expires: new Date().getTime() + REFRESH_TOKEN_EXPIRATION,
	});

	redirect("/");
}

export async function register(
	prevState: FormState,
	data: FormData,
): Promise<FormState> {
	const formData = Object.fromEntries(data);
	const parsed = registerFormSchema.safeParse(formData);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
		};
	}

	const response = await fetch(`${process.env.BACK_URL}/api/v1/auth/register`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			email: parsed.data.email,
			password: parsed.data.password,
		}),
	});

	if (!response.ok) {
		const { message } = await response.json();

		return {
			message: message || "Unexpected error",
		};
	}

	const { accessToken, refreshToken } = await response.json();

	const cookieStore = cookies();

	cookieStore.set("access-token", accessToken, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		expires: new Date().getTime() + ACCESS_TOKEN_EXPIRATION,
	});
	cookieStore.set("refresh-token", refreshToken, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		expires: new Date().getTime() + REFRESH_TOKEN_EXPIRATION,
	});

	redirect("/");
}
