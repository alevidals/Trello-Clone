"use server";

import {
	ACCESS_TOKEN_EXPIRATION,
	REFRESH_TOKEN_EXPIRATION,
} from "@/lib/constants";
import { loginFormSchema, registerFormSchema } from "@/lib/schemas";
import { typedFetch } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormState = {
	message: string;
};

type LoginRegisterRequest = {
	email: string;
	password: string;
};

type LoginRegisterResponse = {
	accessToken: string;
	refreshToken: string;
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

	const response = await typedFetch<
		LoginRegisterRequest,
		LoginRegisterResponse
	>({
		url: `${process.env.BACK_URL}/api/v1/auth/login`,
		method: "POST",
		body: {
			email: parsed.data.email,
			password: parsed.data.password,
		},
		fetchOptions: {
			headers: {
				"content-type": "application/json",
			},
		},
	});

	if (!response.ok) {
		return {
			message: response.error,
		};
	}

	const { accessToken, refreshToken } = response.data;

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

	const response = await typedFetch<
		LoginRegisterRequest,
		LoginRegisterResponse
	>({
		url: `${process.env.BACK_URL}/api/v1/auth/register`,
		method: "POST",
		body: {
			email: parsed.data.email,
			password: parsed.data.password,
		},
	});

	if (!response.ok) {
		return {
			message: response.error,
		};
	}

	const { accessToken, refreshToken } = response.data;

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
