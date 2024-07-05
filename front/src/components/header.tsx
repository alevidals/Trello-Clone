import { AddBoardButton } from "@/components/add-board-button";
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
				<AddBoardButton />
			</div>
		</header>
	);
}
