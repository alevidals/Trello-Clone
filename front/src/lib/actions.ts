"use server";

import {
	ACCESS_TOKEN_EXPIRATION,
	REFRESH_TOKEN_EXPIRATION,
} from "@/lib/constants";
import { loginFormSchema } from "@/lib/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginFormState = {
	message: string;
};

export async function onLoginAction(
	prevState: LoginFormState,
	data: FormData,
): Promise<LoginFormState> {
	const formData = Object.fromEntries(data);
	const parsed = loginFormSchema.safeParse(formData);

	if (!parsed.success) {
		const fields: Record<string, string> = {};
		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}

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
