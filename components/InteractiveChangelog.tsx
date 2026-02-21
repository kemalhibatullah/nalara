'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChangelogPost } from '@/lib/markdown';

interface InteractiveChangelogProps {
    posts: ChangelogPost[];
}

export function InteractiveChangelog({ posts }: InteractiveChangelogProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const formatDateString = (dateStr: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            month: 'long',
            year: 'numeric'
        }).format(new Date(dateStr));
    };

    if (!posts || posts.length === 0) return null;

    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-8 bg-black">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                {/* LEFT COLUMN: Controls */}
                <div className="col-span-1 lg:col-span-4 flex flex-col pt-8">
                    <h2 className="text-4xl font-semibold tracking-tighter text-white mb-10">
                        Update AI Terkini.
                    </h2>

                    <div className="flex flex-col gap-2 mb-10 border-l border-white/5 pl-4">
                        {posts.map((post, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={post.slug}
                                    onClick={() => setActiveIndex(index)}
                                    className={`group relative text-left py-4 px-4 transition-all duration-300 rounded-lg overflow-hidden ${isActive
                                        ? 'bg-white/5 text-white shadow-inner'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
                                        }`}
                                >
                                    {/* Subtle active state left border effect built inside the button */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                                        />
                                    )}

                                    <div className="flex flex-col gap-1 relative z-10">
                                        <span className="text-[12px] font-mono opacity-60 uppercase tracking-widest">{formatDateString(post.date)}</span>
                                        <span className="text-[16px] font-medium tracking-tight leading-snug">
                                            {post.title}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <Link
                        href="/changelog"
                        className="inline-flex items-center text-[14px] font-medium text-white hover:text-zinc-300 transition-colors gap-2"
                    >
                        Lihat Semua Timeline <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {/* RIGHT COLUMN: Interactive Display */}
                <div className="col-span-1 lg:col-span-8">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl relative overflow-hidden h-[500px]">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 p-8 pt-10 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
                            >
                                {/* Markdown Render Container */}
                                <article className="prose prose-invert prose-zinc max-w-none prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-white pb-32">
                                    <ReactMarkdown>
                                        {posts[activeIndex].content}
                                    </ReactMarkdown>
                                </article>
                            </motion.div>
                        </AnimatePresence>

                        {/* Fade-out Gradient to hide overflow elegantly */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
                    </div>
                </div>

            </div>
        </section>
    );
}
