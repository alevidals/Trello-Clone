import { RegisterForm } from "@/components/register-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Register",
	description: "Register page for Trello Clone",
};

export default function RegisterPage() {
	return (
		<>
			<RegisterForm />
			<div className="mt-4">
				<Link href="/login" className="underline text-sm">
					Already have an account? Log in now!
				</Link>
			</div>
		</>
	);
}
