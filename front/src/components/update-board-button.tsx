"use client";
import { Button } from "@/components/ui/button";
import { UpdateBoardDialog } from "@/components/update-board-dialog";
import type { Board } from "@/lib/types";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
	board: Board;
};

export function UpdateBoardButton(props: Props) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
				<IconEdit className="text-blue-500" />
			</Button>
			<UpdateBoardDialog board={props.board} open={open} setOpen={setOpen} />
		</>
	);
}
