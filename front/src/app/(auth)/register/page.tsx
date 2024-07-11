import { RegisterForm } from "@/components/register-form";
import Link from "next/link";

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
