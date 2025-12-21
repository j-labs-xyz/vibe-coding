import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { AccountType, IJournalEntry } from './interfaces/ledger-provider.interface';

@Controller('ledger')
export class LedgerController {
    constructor(private readonly ledgerService: LedgerService) { }

    @Post('accounts')
    async createAccount(@Body() body: { name: string; type: AccountType; currency: string }) {
        return this.ledgerService.createAccount(body.name, body.type, body.currency);
    }

    @Get('accounts')
    async getAccounts() {
        return this.ledgerService.getAccounts();
    }

    @Get('accounts/:id')
    async getAccount(@Param('id') id: string) {
        return this.ledgerService.getAccount(id);
    }

    @Get('accounts/:id/balance')
    async getBalance(@Param('id') id: string) {
        const balance = await this.ledgerService.getBalance(id);
        return { balance };
    }

    @Post('transactions')
    async postTransaction(@Body() body: { description: string; entries: IJournalEntry[]; reference?: string }) {
        return this.ledgerService.postTransaction(body.description, body.entries, body.reference);
    }
}
