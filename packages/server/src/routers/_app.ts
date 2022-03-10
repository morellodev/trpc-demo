import superjson from "superjson";
import { createRouter } from "../helpers/createRouter";
import { messageRouter } from "./message";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("message.", messageRouter)
  .merge("user.", userRouter);

export type AppRouter = typeof appRouter;
