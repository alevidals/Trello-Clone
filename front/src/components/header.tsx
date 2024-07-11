import { AddBoardButton } from "@/components/add-board-button";
import { LogoutButton } from "@/components/logout-button";
import { IconLayoutBoard } from "@tabler/icons-react";
import Link from "next/link";

export function Header() {
	return (
		<header className="border-b">
			<div className="container h-16 flex items-center justify-between">
				<Link href="/" className="flex gap-x-3">
					<IconLayoutBoard />
					Trello Clone
				</Link>
				<div className="flex items-center space-x-2">
					<AddBoardButton />
					<LogoutButton />
				</div>
			</div>
		</header>
	);
}
