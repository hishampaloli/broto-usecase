import mongoose, { ClientSession } from "mongoose";
import { PrismaClient } from "@prisma/client";
import { DATABASE_TYPE } from "../utils/env";

interface DatabaseService {
  startTransaction(): Promise<ClientSession | PrismaClient>;
  commitTransaction(transaction: ClientSession | PrismaClient): Promise<void>;
  rollbackTransaction(transaction: ClientSession | PrismaClient): Promise<void>;
}

class PrismaService implements DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async startTransaction(): Promise<PrismaClient> {
    return this.prisma;
  }

  async commitTransaction(prisma: PrismaClient): Promise<void> {
    await prisma.$transaction.commit();
  }

  async rollbackTransaction(prisma: PrismaClient): Promise<void> {
    await prisma.$transaction.rollback();
  }
}

class MongooseService implements DatabaseService {
  async startTransaction(): Promise<ClientSession> {
    const session = await mongoose.startSession();
    session.startTransaction();
    return session;
  }

  async commitTransaction(session: ClientSession): Promise<void> {
    await session.commitTransaction();
    session.endSession();
  }

  async rollbackTransaction(session: ClientSession): Promise<void> {
    await session.abortTransaction();
    session.endSession();
  }
}

type TransactionClientType = PrismaClient | ClientSession;

const transactionService =
  DATABASE_TYPE === "pg" ? new PrismaService() : new MongooseService();

export { transactionService, TransactionClientType };
