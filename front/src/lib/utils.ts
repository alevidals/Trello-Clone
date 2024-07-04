import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type FetchRequest<I> = {
	url: string | URL;
	fetchOptions?: Omit<RequestInit, "body" | "method">;
} & (
	| {
			method: "GET" | "DELETE";
	  }
	| {
			method: "POST" | "PUT" | "PATCH";
			body?: I;
	  }
);

type FetchResponse<O> = (
	| {
			ok: true;
			data: O;
	  }
	| {
			ok: false;
			error: string;
	  }
) & {
	status: number;
};

export async function typedFetch<I, O>(
	args: FetchRequest<I>,
): Promise<FetchResponse<O>> {
	const { method, url, fetchOptions } = args;

	const headers = {
		...fetchOptions?.headers,
		...((method === "POST" || method === "PUT" || method === "PATCH") &&
		args.body
			? { "Content-Type": "application/json" }
			: {}),
	};

	try {
		const response = await fetch(url, {
			...fetchOptions,
			headers: headers,
			method,
			...((method === "POST" || method === "PUT" || method === "PATCH") &&
				args.body && {
					body: JSON.stringify(args.body),
				}),
		});

		if (!response.ok) {
			const data = await response.json();

			return {
				ok: false,
				error: data.message || "Unexpected error",
				status: response.status,
			};
		}

		const data: O = await response.json();

		return {
			ok: true,
			status: response.status,
			data,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				ok: false,
				status: 500,
				error: error.message,
			};
		}

		return {
			ok: false,
			status: 500,
			error: "Unexpected error",
		};
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
