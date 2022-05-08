import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'],  //apresentar os logs de requisições ao banco
});