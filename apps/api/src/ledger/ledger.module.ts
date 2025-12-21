import { Module } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { LedgerController } from './ledger.controller';
import { PrismaLedgerProvider } from './providers/prisma-ledger.provider';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [LedgerController],
  providers: [LedgerService, PrismaLedgerProvider, PrismaService],
  exports: [LedgerService],
})
export class LedgerModule { }
