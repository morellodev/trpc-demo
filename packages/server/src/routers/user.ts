import { z } from "zod";
import { createRouter } from "../helpers/createRouter";

export const userRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return ctx.prisma.user.findMany();
    },
  })
  .query("byId", {
    input: z.string().cuid(),
    async resolve({ ctx, input }) {
      return ctx.prisma.message.findFirst({
        where: { id: input },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      phone: z.string(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.user.create({ data: input });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.user.delete({
        where: { id: input.id },
      });
    },
  });
