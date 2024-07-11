"use client";

import { logout } from "@/app/(auth)/_actions";
import { Button } from "@/components/ui/button";
import { IconLogout } from "@tabler/icons-react";

export function LogoutButton() {
	async function handleClick() {
		await logout();
	}

	return (
		<Button size="icon" variant="ghost" onClick={handleClick}>
			<IconLogout />
		</Button>
	);
}
