import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Sign in to VastLink</h1>
                    <p className="text-gray-500 text-sm mt-2">Enter your credentials to access your account</p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="admin@vastlink.com"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                        />
                    </div>

                    <Link href="/dashboard" className="block w-full">
                        <Button className="w-full">Sign In</Button>
                    </Link>
                </form>
                <div className="mt-4 text-center text-sm text-gray-500">
                    Prototyping Mode: Click "Sign In" to go to dashboard.
                </div>
            </div>
        </div>
    );
}
