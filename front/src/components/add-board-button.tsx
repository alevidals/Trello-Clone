"use client";

import { AddBoardDialog } from "@/components/add-board-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AddBoardButton() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Add Board
			</Button>
			<AddBoardDialog open={open} setOpen={setOpen} />
		</>
	);
}
