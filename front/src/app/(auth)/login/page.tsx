import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Login page for Trello Clone",
};

export default function LoginPage() {
	return <LoginForm />;
}
