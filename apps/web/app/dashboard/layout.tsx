import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full bg-slate-50/50">
                <div className="h-16 w-full fixed z-50 pl-72 inset-y-0">
                    <Header />
                </div>
                <div className="pt-20 px-8 h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
