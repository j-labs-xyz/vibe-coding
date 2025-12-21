import { Injectable } from '@nestjs/common';
import { PrismaLedgerProvider } from './providers/prisma-ledger.provider';
import { AccountType, IJournalEntry } from './interfaces/ledger-provider.interface';

@Injectable()
export class LedgerService {
    constructor(private readonly ledgerProvider: PrismaLedgerProvider) { }

    async createAccount(name: string, type: AccountType, currency: string) {
        return this.ledgerProvider.createAccount(name, type, currency);
    }

    async getAccount(id: string) {
        return this.ledgerProvider.getAccount(id);
    }

    async getAccounts() {
        return this.ledgerProvider.getAccounts();
    }

    async getBalance(accountId: string) {
        return this.ledgerProvider.getBalance(accountId);
    }

    async postTransaction(description: string, entries: IJournalEntry[], reference?: string) {
        return this.ledgerProvider.postTransaction(description, entries, reference);
    }
}
