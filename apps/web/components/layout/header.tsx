export function Header() {
    return (
        <div className="flex items-center p-4 border-b h-full gap-x-4 bg-white/50 backdrop-blur-sm">
            <div className="hidden lg:block lg:w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="font-semibold text-lg text-gray-700">
                        Dashboard
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="h-8 w-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 font-bold border border-sky-500/20">
                            A
                        </div>
                        <span className="text-sm text-gray-600 font-medium">Admin User</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
