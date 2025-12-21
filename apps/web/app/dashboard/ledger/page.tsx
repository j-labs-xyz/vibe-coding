'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AccountForm } from '@/components/ledger/account-form';
import { TransactionForm } from '@/components/ledger/transaction-form';
import { BalanceSheet } from '@/components/ledger/balance-sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Account {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: string;
}

export default function LedgerPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAccounts = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const res = await axios.get(`${apiUrl}/ledger/accounts`);
            setAccounts(res.data);
        } catch (error) {
            console.error('Failed to fetch accounts', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">General Ledger</h1>
                    <p className="text-zinc-400">Double-entry accounting for your organization.</p>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-zinc-900 border border-zinc-800">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="accounts">Accounts</TabsTrigger>
                    <TabsTrigger value="journal">Journal Entry</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <BalanceSheet accounts={accounts} />
                </TabsContent>

                <TabsContent value="accounts">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-medium text-white mb-4">Create Account</h3>
                            <AccountForm onSuccess={fetchAccounts} />
                        </div>
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-medium text-white mb-4">Chart of Accounts</h3>
                            <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-zinc-900 text-zinc-400 font-medium">
                                        <tr>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Type</th>
                                            <th className="px-4 py-3 text-right">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800">
                                        {accounts.map(acc => (
                                            <tr key={acc.id} className="hover:bg-white/5">
                                                <td className="px-4 py-3 text-white">{acc.name}</td>
                                                <td className="px-4 py-3 text-zinc-400">{acc.type}</td>
                                                <td className="px-4 py-3 text-right font-mono text-zinc-300">
                                                    {parseFloat(acc.balance).toLocaleString('en-US', { style: 'currency', currency: acc.currency })}
                                                </td>
                                            </tr>
                                        ))}
                                        {accounts.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="px-4 py-8 text-center text-zinc-500">No accounts found. Create one to get started.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="journal">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-lg font-medium text-white mb-4">Post New Transaction</h3>
                        <TransactionForm accounts={accounts} onSuccess={fetchAccounts} />
                        <p className="text-zinc-500 text-sm mt-4 text-center">
                            All transactions must be balanced. Debits = Credits.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
