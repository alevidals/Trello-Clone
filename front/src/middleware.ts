import {
	ACCESS_TOKEN_EXPIRATION,
	REFRESH_TOKEN_EXPIRATION,
} from "@/lib/constants";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get("access-token")?.value;
	const refreshToken = request.cookies.get("refresh-token")?.value;

	const validateTokenResponse = await fetch(
		`${process.env.BACK_URL}/api/v1/auth/validate-token`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	if (!validateTokenResponse.ok) {
		if (!refreshToken) {
			return NextResponse.redirect(`${request.nextUrl.origin}/login`);
		}

		const refreshTokenResponse = await fetch(
			`${process.env.BACK_URL}/api/v1/auth/refresh-token`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);

		if (!refreshTokenResponse.ok) {
			return NextResponse.redirect(`${request.nextUrl.origin}/login`);
		}

		const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
			await refreshTokenResponse.json();

		const response = NextResponse.next();

		response.cookies.set({
			name: "access-token",
			value: newAccessToken,
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			expires: new Date().getTime() + ACCESS_TOKEN_EXPIRATION,
		});
		response.cookies.set({
			name: "refresh-token",
			value: newRefreshToken,
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			expires: new Date().getTime() + REFRESH_TOKEN_EXPIRATION,
		});

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
