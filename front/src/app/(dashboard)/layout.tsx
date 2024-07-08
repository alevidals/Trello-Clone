import { Header } from "@/components/header";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<main className="container mt-4 flex-1">{children}</main>
		</div>
	);
}
