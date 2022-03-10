import { z } from "zod";
import { createRouter } from "../helpers/createRouter";

export const messageRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return ctx.prisma.message.findMany();
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
  .query("byRecipientId", {
    input: z.string().cuid(),
    async resolve({ ctx, input }) {
      return ctx.prisma.message.findMany({
        where: { recipientId: input },
        orderBy: { sentAt: "asc" },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      text: z.string(),
      recipientId: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.message.create({
        data: input,
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.message.delete({
        where: { id: input.id },
      });
    },
  });
