'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AccountForm({ onSuccess }: { onSuccess: () => void }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('ASSET');
    const [currency, setCurrency] = useState('USD');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            await axios.post(`${apiUrl}/ledger/accounts`, { name, type, currency });
            setName('');
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Account Name</Label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Cash in Bank"
                        required
                        className="bg-black border-zinc-700"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Type</Label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-zinc-700 bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
                    >
                        <option value="ASSET">Asset</option>
                        <option value="LIABILITY">Liability</option>
                        <option value="EQUITY">Equity</option>
                        <option value="REVENUE">Revenue</option>
                        <option value="EXPENSE">Expense</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Currency</Label>
                    <Input
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        placeholder="USD"
                        required
                        className="bg-black border-zinc-700"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700">
                    {isLoading ? 'Creating...' : 'Create Account'}
                </Button>
            </div>
        </form>
    );
}
