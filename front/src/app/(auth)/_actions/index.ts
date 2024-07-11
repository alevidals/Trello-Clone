"use server";

import {
	ACCESS_TOKEN_COOKIE,
	ACCESS_TOKEN_EXPIRATION,
	REFRESH_TOKEN_COOKIE,
	REFRESH_TOKEN_EXPIRATION,
} from "@/lib/constants";
import { loginFormSchema, registerFormSchema } from "@/lib/schemas";
import type { LoginForm, RegisterForm } from "@/lib/types";
import { typedFetch } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormState = {
	success: boolean;
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

export async function login(data: LoginForm): Promise<FormState> {
	const parsed = loginFormSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
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
			success: false,
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

export async function register(data: RegisterForm): Promise<FormState> {
	const parsed = registerFormSchema.safeParse(data);

	if (!parsed.success) {
		return {
			message: "Invalid form data",
			success: false,
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
			success: false,
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

export async function logout() {
	const cookieStore = cookies();

	await typedFetch<null, null>({
		url: `${process.env.BACK_URL}/api/v1/auth/logout`,
		method: "POST",
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${cookieStore.get(ACCESS_TOKEN_COOKIE)?.value}`,
			},
		},
	});

	cookieStore.delete(ACCESS_TOKEN_COOKIE);
	cookieStore.delete(REFRESH_TOKEN_COOKIE);

	redirect("/login");
}
