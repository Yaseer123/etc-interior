import { PrismaClient } from "./generated/prisma";

const globalForPrisma = globalThis;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
