import type { loginFormSchema } from "@/lib/schemas";
import type { z } from "zod";

export type LoginForm = z.infer<typeof loginFormSchema>;
