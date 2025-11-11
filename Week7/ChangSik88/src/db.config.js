
import dotenv from "dotenv";
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

dotenv.config();

export const prisma = new PrismaClient({ log: ["query"] });
