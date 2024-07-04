import { IconLayoutBoard } from "@tabler/icons-react";
import Link from "next/link";

export function Header() {
	return (
		<header className="border-b">
			<div className="container h-12 flex items-center">
				<Link href="/" className="flex gap-x-3">
					<IconLayoutBoard />
					Trello Clone
				</Link>
			</div>
		</header>
	);
}
