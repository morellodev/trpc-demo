import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@w/server";

export const trpc = createReactQueryHooks<AppRouter>();
