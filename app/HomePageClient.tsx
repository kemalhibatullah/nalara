'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ChangelogPost } from '@/lib/markdown';
import { DirectoryItem } from '@/lib/directory';
import { InteractiveChangelog } from '@/components/InteractiveChangelog';
import { InfiniteMarquee } from '@/components/InfiniteMarquee';

// --- Internal Components ---

function Hero() {
    return (
        <section className="relative pt-32 pb-20 sm:pt-20 sm:pb-32 overflow-hidden border-b border-white/5 bg-black">
            <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium tracking-wide text-zinc-400 mb-8 uppercase">
                        <span>Platform Profesional</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter mb-6 text-white leading-[1.05]">
                        Kuasai Era AI <br className="hidden sm:block" /> Tanpa Tertinggal.
                    </h1>

                    <p className="max-w-xl text-md sm:text-lg tracking-tight text-zinc-400 leading-relaxed font-normal mb-10">
                        Satu platform profesional untuk melacak rilis AI terbaru dan menemukan resource terkurasi.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <Link
                            href="/directory"
                            className="rounded-full bg-white text-black px-8 py-3.5 text-[14px] font-medium transition-colors hover:bg-zinc-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            Eksplor Direktori
                        </Link>

                        <Link
                            href="/changelog"
                            className="rounded-full bg-white/5 border border-white/10 text-white px-8 py-3.5 text-[14px] font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            Lihat Timeline AI <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Minimalist Wireframe Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-20 sm:mt-28 relative w-full max-w-4xl"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md p-1 shadow-2xl"
                    >
                        <div className="rounded-lg border border-white/5 bg-zinc-900/50 w-full h-[300px] sm:h-[400px] flex flex-col overflow-hidden relative">

                            {/* Browser / App Header */}
                            <div className="flex items-center px-4 py-3 border-b border-white/5 bg-zinc-950">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                </div>
                                <div className="mx-auto h-4 w-48 bg-zinc-900 rounded-md" />
                            </div>

                            {/* Mock Content Layout */}
                            <div className="flex flex-1 p-6 gap-6">
                                {/* Sidebar Mock */}
                                <div className="hidden sm:flex flex-col gap-3 w-48 shrink-0">
                                    <div className="h-6 w-full bg-zinc-800/50 rounded-md" />
                                    <div className="h-4 w-3/4 bg-zinc-800/30 rounded-md" />
                                    <div className="h-4 w-5/6 bg-zinc-800/30 rounded-md" />
                                    <div className="h-4 w-full bg-zinc-800/30 rounded-md" />
                                    <div className="h-4 w-2/3 bg-zinc-800/30 rounded-md" />
                                </div>

                                {/* Main Content Mock */}
                                <div className="flex flex-col gap-4 flex-1">
                                    <div className="h-24 w-full bg-zinc-800/20 rounded-lg border border-white/5 flex flex-col justify-end p-4">
                                        <div className="h-3 w-1/3 bg-zinc-700/50 rounded-sm mb-2" />
                                        <div className="h-2 w-1/4 bg-zinc-800/50 rounded-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-20 bg-zinc-800/20 rounded-lg border border-white/5" />
                                        <div className="h-20 bg-zinc-800/20 rounded-lg border border-white/5" />
                                    </div>
                                    <div className="h-8 w-1/2 bg-zinc-800/20 rounded-lg border border-white/5 mt-auto" />
                                </div>
                            </div>

                            {/* Fade out bottom overlay */}
                            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

function FeatureGrid() {
    const cards = [
        {
            title: "Changelog Terstruktur",
            desc: "Merangkum dampak dan perilisan harian menjadi linimasa yang bersih.",
            visual: (
                <div className="flex flex-col gap-3 w-full max-w-[140px]">
                    <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-zinc-500" />
                        <div className="h-1 flex-1 bg-zinc-700 rounded-full" />
                    </div>
                    <div className="flex gap-2 items-center opacity-70">
                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                        <div className="h-1 w-2/3 bg-zinc-800 rounded-full" />
                    </div>
                    <div className="flex gap-2 items-center opacity-40">
                        <div className="w-2 h-2 rounded-full border border-zinc-700" />
                        <div className="h-1 w-1/2 bg-zinc-800 rounded-full" />
                    </div>
                </div>
            )
        },
        {
            title: "Direktori Prompt",
            desc: "Kumpulan prompt dan tool berkinerja tinggi yang teruji.",
            visual: (
                <div className="w-full max-w-[160px] h-8 rounded-md bg-zinc-900 border border-white/10 flex items-center px-3 shadow-inner">
                    <div className="w-3 h-3 text-zinc-500 font-mono text-[10px]">&gt;</div>
                    <div className="ml-2 h-1 w-12 bg-zinc-600 rounded-full animate-pulse" />
                </div>
            )
        },
        {
            title: "100% Bahasa Indonesia",
            desc: "Akses resource tech kelas dunia tanpa kendala linguistik.",
            visual: (
                <div className="grid grid-cols-3 gap-2 w-full max-w-[120px]">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className={`w-full aspect-square rounded-sm ${i === 4 ? 'bg-zinc-400' : 'bg-zinc-800/50'}`} />
                    ))}
                </div>
            )
        }
    ];

    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 border-b border-white/5 bg-black">
            <div className="mb-16">
                <h2 className="text-3xl font-semibold tracking-tighter text-white">
                    Semua Kekuatan AI, Satu Tempat.
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                        className="flex flex-col rounded-2xl border border-white/5 bg-zinc-900/30 overflow-hidden min-h-[320px]"
                    >
                        {/* Minimalist Abstract UI Graphic (Top 60%) */}
                        <div className="h-[60%] w-full bg-zinc-950/50 flex items-center justify-center p-6 border-b border-white/5 relative overflow-hidden">
                            {/* Extremely subtle ambient dot pattern background */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />

                            <div className="relative z-10 flex items-center justify-center w-full h-full">
                                {card.visual}
                            </div>
                        </div>

                        {/* Content (Bottom 40%) */}
                        <div className="p-8 flex-1 flex flex-col justify-end">
                            <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                                {card.title}
                            </h3>
                            <p className="text-[14px] leading-relaxed text-zinc-400">
                                {card.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function BottomCTA() {
    return (
        <section className="relative py-48 sm:py-64 bg-black overflow-hidden border-t border-white/5">
            {/* Ultra-subtle deep gray radial glow */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                <div className="w-[80vw] max-w-4xl h-[60vh] bg-zinc-800/20 blur-[150px] rounded-[100%]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center"
            >
                <h2 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-white mb-10">
                    Siap Meningkatkan Produktivitas?
                </h2>

                <Link
                    href="/directory"
                    className="rounded-full bg-white px-8 py-4 text-[14px] font-medium text-black hover:bg-zinc-200 transition-colors inline-flex items-center"
                >
                    Eksplor Direktori Sekarang
                </Link>
            </motion.div>
        </section>
    );
}

export default function HomePageClient({ changelogs, directoryItems }: { changelogs: ChangelogPost[], directoryItems: DirectoryItem[] }) {
    return (
        <main className="min-h-screen bg-black selection:bg-zinc-800 selection:text-white font-sans overflow-hidden">
            <Hero />
            <FeatureGrid />

            <section className="py-24 bg-black border-b border-white/5">
                <div className="mx-auto max-w-[1300px]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-6 lg:px-12">
                        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-white leading-[1.1]">
                            Kumpulan <br className="hidden sm:block" />Resource Pilihan.
                        </h2>
                        <Link
                            href="/directory"
                            className="px-5 py-2.5 rounded-full border border-white/10 text-white text-[14px] font-medium hover:bg-white/5 transition-colors whitespace-nowrap mb-1 sm:mb-2"
                        >
                            Jelajahi Direktori &rarr;
                        </Link>
                    </div>
                    <InfiniteMarquee items={directoryItems} />
                </div>
            </section>

            <InteractiveChangelog posts={changelogs} />
            <BottomCTA />
        </main>
    );
}
