import { UserButton } from "@clerk/nextjs";
import { CreditCard, Share2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0b0f14]">
            {/* Top Navigation Bar */}
            <header className="border-b border-white/10 sticky top-0 z-50 bg-[#12141a]">
                <div className="flex h-12 items-center justify-between px-4">
                    {/* Workflow Name */}
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] text-gray-400">Workflow</span>
                        <input
                            type="text"
                            defaultValue="Untitled workflow"
                            className="h-8 w-56 rounded-md border border-white/10 bg-[#0f1319] px-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-400/40"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs text-gray-200 transition-colors hover:bg-white/5"
                            title="Credits"
                        >
                            <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                            Credits
                        </button>
                        <button
                            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs text-gray-200 transition-colors hover:bg-white/5"
                            title="Share"
                        >
                            <Share2 className="h-3.5 w-3.5 text-gray-400" />
                            Share
                        </button>
                        <div className="[&>button]:outline-none [&>button]:ring-0">
                            <UserButton 
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "h-7 w-7 rounded-md border border-white/10"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="h-[calc(100vh-3rem)] relative">
                {children}
            </main>
        </div>
    );
}
