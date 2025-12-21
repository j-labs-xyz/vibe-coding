'use client';

interface Account {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: string;
}

export function BalanceSheet({ accounts }: { accounts: Account[] }) {

    const assets = accounts.filter(a => a.type === 'ASSET');
    const liabilities = accounts.filter(a => a.type === 'LIABILITY');
    const equity = accounts.filter(a => a.type === 'EQUITY');
    const income = accounts.filter(a => a.type === 'REVENUE');
    const expenses = accounts.filter(a => a.type === 'EXPENSE');

    const formatMoney = (amount: string) => {
        const val = parseFloat(amount);
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    }

    // Simple helper to calculate group total
    const total = (group: Account[]) => group.reduce((sum, a) => sum + parseFloat(a.balance), 0);

    const renderGroup = (title: string, group: Account[]) => (
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2 border-b border-zinc-800 pb-1">{title}</h3>
            {group.length === 0 ? <div className="text-zinc-600 text-sm italic">No accounts</div> : (
                <div className="space-y-1">
                    {group.map(acc => (
                        <div key={acc.id} className="flex justify-between text-sm py-1 hover:bg-white/5 px-2 rounded">
                            <span className="text-zinc-300">{acc.name}</span>
                            <span className="font-mono text-white">{formatMoney(acc.balance)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between text-sm py-2 font-bold border-t border-zinc-800 mt-2 px-2">
                        <span className="text-zinc-400">Total {title}</span>
                        <span className="font-mono text-zinc-200">{formatMoney(total(group).toString())}</span>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    {renderGroup('Assets', assets)}
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    {renderGroup('Expenses', expenses)}
                </div>
            </div>
            <div className="space-y-8">
                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    {renderGroup('Liabilities', liabilities)}
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    {renderGroup('Equity', equity)}
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    {renderGroup('Income', income)}
                </div>
            </div>
        </div>
    );
}
