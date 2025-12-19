import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
                <p className="text-muted-foreground text-gray-500">
                    Welcome back to your financial dashboard.
                </p>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {/* Placeholder Cards */}
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <div className="text-sm font-medium text-gray-500">Total Balance</div>
                    <div className="text-2xl font-bold mt-2">$24,500.00</div>
                    <div className="text-xs text-green-500 mt-1">+12% from last month</div>
                </div>
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <div className="text-sm font-medium text-gray-500">Active Users</div>
                    <div className="text-2xl font-bold mt-2">+573</div>
                    <div className="text-xs text-gray-500 mt-1">+201 since last hour</div>
                </div>
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <div className="text-sm font-medium text-gray-500">Pending Transfers</div>
                    <div className="text-2xl font-bold mt-2">12</div>
                    <div className="text-xs text-orange-500 mt-1">Requires approval</div>
                </div>
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <div className="text-sm font-medium text-gray-500">FX Rate</div>
                    <div className="text-2xl font-bold mt-2">1.08 USD/EUR</div>
                    <div className="text-xs text-blue-500 mt-1">Updated 5 min ago</div>
                </div>
            </div>

            <div className="mt-8 flex gap-4">
                <Button>Process Payment</Button>
                <Button variant="outline">View Reports</Button>
            </div>
        </div>
    );
}
