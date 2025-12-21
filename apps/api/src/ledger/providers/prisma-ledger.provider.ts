import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';
import {
    ILedgerProvider,
    IAccount,
    ITransaction,
    IJournalEntry,
    AccountType,
    EntryDirection
} from '../interfaces/ledger-provider.interface';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaLedgerProvider implements ILedgerProvider {
    constructor(private prisma: PrismaService) { }

    async createAccount(name: string, type: AccountType, currency: string): Promise<IAccount> {
        const account = await this.prisma.ledgerAccount.create({
            data: {
                name,
                type: type as any, // Enum mapping matches
                currency,
                balance: new Decimal(0),
            },
        });

        return {
            id: account.id,
            name: account.name,
            type: account.type as AccountType,
            currency: account.currency,
            balance: account.balance.toString(),
        };
    }

    async getAccount(id: string): Promise<IAccount | null> {
        const account = await this.prisma.ledgerAccount.findUnique({ where: { id } });
        if (!account) return null;
        return {
            id: account.id,
            name: account.name,
            type: account.type as AccountType,
            currency: account.currency,
            balance: account.balance.toString(),
        };
    }

    async getAccounts(): Promise<IAccount[]> {
        const accounts = await this.prisma.ledgerAccount.findMany({ orderBy: { name: 'asc' } });
        return accounts.map(account => ({
            id: account.id,
            name: account.name,
            type: account.type as AccountType,
            currency: account.currency,
            balance: account.balance.toString(),
        }));
    }

    async getBalance(accountId: string): Promise<string> {
        const account = await this.getAccount(accountId);
        return account ? account.balance : '0';
    }

    async postTransaction(description: string, entries: IJournalEntry[], reference?: string): Promise<ITransaction> {
        // 1. Verify Balance (Debits must equal Credits)
        const debitTotal = entries
            .filter(e => e.direction === EntryDirection.DEBIT)
            .reduce((sum, e) => sum.add(new Decimal(e.amount)), new Decimal(0));

        const creditTotal = entries
            .filter(e => e.direction === EntryDirection.CREDIT)
            .reduce((sum, e) => sum.add(new Decimal(e.amount)), new Decimal(0));

        if (!debitTotal.equals(creditTotal)) {
            throw new BadRequestException(`Transaction unbalanced: Debits ${debitTotal} != Credits ${creditTotal}`);
        }

        // 2. Execute Transaction Atomically
        const transaction = await this.prisma.$transaction(async (prisma) => {
            // Create the main transaction record
            const ledgerTx = await prisma.ledgerTransaction.create({
                data: {
                    description,
                    reference,
                    date: new Date(),
                },
            });

            // Process each entry
            for (const entry of entries) {
                // Create the entry record
                await prisma.ledgerEntry.create({
                    data: {
                        amount: new Decimal(entry.amount),
                        direction: entry.direction as any,
                        accountId: entry.accountId,
                        transactionId: ledgerTx.id,
                    },
                });

                // Update Account Balance
                // Logic: 
                // Asset/Expense: Debit increases, Credit decreases
                // Liability/Equity/Revenue: Credit increases, Debit decreases
                // However, a simple signed approach is: Balance = Sum(Debits) - Sum(Credits) for Assets?
                // Or we maintain a "Normal Balance". 
                // Let's stick to the standard:
                // Asset/Expense: Add Debit, Subtract Credit
                // Liability/Equity/Revenue: Add Credit, Subtract Debit

                const account = await prisma.ledgerAccount.findUniqueOrThrow({ where: { id: entry.accountId } });
                const amount = new Decimal(entry.amount);
                let balanceChange = new Decimal(0);

                if (['ASSET', 'EXPENSE'].includes(account.type)) {
                    if (entry.direction === EntryDirection.DEBIT) balanceChange = amount;
                    else balanceChange = amount.negated();
                } else {
                    if (entry.direction === EntryDirection.CREDIT) balanceChange = amount;
                    else balanceChange = amount.negated();
                }

                await prisma.ledgerAccount.update({
                    where: { id: entry.accountId },
                    data: { balance: { increment: balanceChange } }
                });
            }

            return prisma.ledgerTransaction.findUniqueOrThrow({
                where: { id: ledgerTx.id },
                include: { entries: true }
            });
        });

        return {
            id: transaction.id,
            description: transaction.description,
            reference: transaction.reference || undefined,
            date: transaction.date,
            entries: transaction.entries.map(e => ({
                accountId: e.accountId,
                amount: e.amount.toString(),
                direction: e.direction as EntryDirection
            }))
        };
    }
}
