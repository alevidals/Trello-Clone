"use client";

import { AddBoardDialog } from "@/components/add-board-dialog";
import { Button } from "@/components/ui/button";
import { IconTablePlus } from "@tabler/icons-react";
import { useState } from "react";

export function AddBoardButton() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				variant="outline"
				onClick={() => setOpen(true)}
				className="hidden md:inline-block"
			>
				<span>Add board</span>
			</Button>
			<Button
				variant="outline"
				onClick={() => setOpen(true)}
				className="md:hidden"
			>
				<IconTablePlus />
			</Button>
			<AddBoardDialog open={open} setOpen={setOpen} />
		</>
	);
}
