'use client';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f3f4f6] relative overflow-hidden flex items-center justify-center">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* CSS for grid background */}
            <style jsx>{`
                .bg-grid {
                    background-image:
                        linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05) 76%, transparent 77%, transparent),
                        linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05) 76%, transparent 77%, transparent);
                    background-size: 50px 50px;
                }
            `}</style>
        </div>
    );
}
