export enum AccountType {
    ASSET = 'ASSET',
    LIABILITY = 'LIABILITY',
    EQUITY = 'EQUITY',
    REVENUE = 'REVENUE',
    EXPENSE = 'EXPENSE',
}

export enum EntryDirection {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
}

export interface IAccount {
    id: string;
    name: string;
    type: AccountType;
    currency: string;
    balance: string; // Using string for high-precision decimal representation
}

export interface IJournalEntry {
    accountId: string;
    amount: string;
    direction: EntryDirection;
}

export interface ITransaction {
    id: string;
    reference?: string;
    description: string;
    date: Date;
    entries: IJournalEntry[];
}

export interface ILedgerProvider {
    createAccount(name: string, type: AccountType, currency: string): Promise<IAccount>;
    getAccount(id: string): Promise<IAccount | null>;
    getBalance(accountId: string): Promise<string>;

    getAccounts(): Promise<IAccount[]>;

    // The core double-entry operation: post a transaction with multiple entries
    postTransaction(
        description: string,
        entries: IJournalEntry[],
        reference?: string
    ): Promise<ITransaction>;
}
