'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Entry {
    accountId: string;
    amount: string;
    direction: 'DEBIT' | 'CREDIT';
}

interface Account {
    id: string;
    name: string;
    type: string;
}

export function TransactionForm({ accounts, onSuccess }: { accounts: Account[], onSuccess: () => void }) {
    const [description, setDescription] = useState('');
    const [entries, setEntries] = useState<Entry[]>([
        { accountId: '', amount: '', direction: 'DEBIT' },
        { accountId: '', amount: '', direction: 'CREDIT' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const addEntry = () => {
        setEntries([...entries, { accountId: '', amount: '', direction: 'DEBIT' }]);
    };

    const removeEntry = (index: number) => {
        setEntries(entries.filter((_, i) => i !== index));
    };

    const updateEntry = (index: number, field: keyof Entry, value: string) => {
        const newEntries = [...entries];
        newEntries[index] = { ...newEntries[index], [field]: value };
        setEntries(newEntries);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            await axios.post(`${apiUrl}/ledger/transactions`, {
                description,
                entries: entries.map(e => ({
                    ...e,
                    amount: parseFloat(e.amount) // Ensure server handles number or string correctly. Logic uses string constructor for Decimal, but sending string via JSON is safer.
                }))
            });
            setDescription('');
            setEntries([
                { accountId: '', amount: '', direction: 'DEBIT' },
                { accountId: '', amount: '', direction: 'CREDIT' }
            ]);
            onSuccess();
        } catch (error: any) {
            console.error(error);
            alert(`Failed to post transaction: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const debitTotal = entries
        .filter(e => e.direction === 'DEBIT')
        .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const creditTotal = entries
        .filter(e => e.direction === 'CREDIT')
        .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const isBalanced = Math.abs(debitTotal - creditTotal) < 0.000001;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
            <div className="space-y-2">
                <Label>Description</Label>
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Transaction Description"
                    required
                    className="bg-black border-zinc-700"
                />
            </div>

            <div className="space-y-2">
                <Label>Entries</Label>
                {entries.map((entry, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <select
                            value={entry.accountId}
                            onChange={(e) => updateEntry(index, 'accountId', e.target.value)}
                            className="flex-1 h-9 rounded-md border border-zinc-700 bg-black px-3 py-1 text-sm text-white"
                            required
                        >
                            <option value="">Select Account</option>
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id}>{acc.name} ({acc.type})</option>
                            ))}
                        </select>
                        <select
                            value={entry.direction}
                            onChange={(e) => updateEntry(index, 'direction', e.target.value as any)}
                            className="w-24 h-9 rounded-md border border-zinc-700 bg-black px-3 py-1 text-sm text-white"
                        >
                            <option value="DEBIT">Debit</option>
                            <option value="CREDIT">Credit</option>
                        </select>
                        <Input
                            type="number"
                            step="0.01"
                            value={entry.amount}
                            onChange={(e) => updateEntry(index, 'amount', e.target.value)}
                            placeholder="Amount"
                            required
                            className="w-32 bg-black border-zinc-700"
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeEntry(index)} disabled={entries.length <= 2}>
                            <Trash2 className="h-4 w-4 text-zinc-500 hover:text-red-500" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-2">
                <Button type="button" variant="outline" size="sm" onClick={addEntry} className="text-zinc-400 border-zinc-700 hover:bg-zinc-800">
                    <Plus className="h-4 w-4 mr-2" /> Add Line
                </Button>

                <div className="text-right">
                    <div className="text-sm text-zinc-400">
                        Debits: <span className="text-white font-mono">{debitTotal.toFixed(2)}</span> |
                        Credits: <span className="text-white font-mono">{creditTotal.toFixed(2)}</span>
                    </div>
                    {!isBalanced && <div className="text-red-500 text-xs font-bold mt-1">Unbalanced! Difference: {(debitTotal - creditTotal).toFixed(2)}</div>}
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-800">
                <Button type="submit" disabled={isLoading || !isBalanced} className="bg-indigo-600 hover:bg-indigo-700">
                    {isLoading ? 'Posting...' : 'Post Transaction'}
                </Button>
            </div>
        </form>
    );
}
