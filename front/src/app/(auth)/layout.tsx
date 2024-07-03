type AuthLayoutProps = {
	children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<main className="min-h-dvh flex flex-col items-center justify-center">
			{children}
		</main>
	);
}
