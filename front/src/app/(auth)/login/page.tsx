import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Login",
	description: "Login page for Trello Clone",
};

export default function LoginPage() {
	return (
		<>
			<LoginForm />
			<div className="mt-4">
				<Link href="/register" className="underline text-sm">
					Don&apos;t have an account? Register now!
				</Link>
			</div>
		</>
	);
}
