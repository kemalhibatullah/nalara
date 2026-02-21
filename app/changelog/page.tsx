import { Metadata } from 'next';
import { getChangelogs } from '@/lib/markdown';
import { TimelineFeed } from '@/components/TimelineFeed';

export const metadata: Metadata = {
    title: 'Changelog | AI Directory',
    description: 'Lacak perkembangan model, framework, dan tren AI terbaru secara kronologis.',
};

export default function ChangelogPage() {
    const changelogs = getChangelogs();

    return (
        <main className="min-h-screen bg-black selection:bg-zinc-800 selection:text-white font-sans">
            <div className="mx-auto max-w-[1200px] px-6 py-32 sm:py-48">

                {/* Massive Framer-style Page Header */}
                <header className="mb-24 sm:mb-32 max-w-3xl ml-0 sm:ml-[187px]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium tracking-wide text-zinc-400 mb-6 uppercase">
                        <span>Timeline Log</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl font-semibold tracking-tighter text-white mb-6">
                        Pembaruan AI.
                    </h1>

                    <p className="text-lg sm:text-xl tracking-tight text-zinc-400 leading-relaxed font-normal">
                        Lacak perkembangan model, framework, dan tren AI terbaru secara kronologis. Dirangkum khusus untuk profesional teknologi Indonesia.
                    </p>
                </header>

                {/* Framer-style Timeline Feed Component */}
                <TimelineFeed posts={changelogs} />

            </div>
        </main>
    );
}
