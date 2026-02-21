'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ChangelogPost } from '@/lib/markdown';

// Helper to extract the first markdown image URL
const getFirstImage = (content: string) => {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
};

// Helper for formatting date strings
const formatDateString = (dateStr: string) => {
    return new Intl.DateTimeFormat('id-ID', {
        month: 'short',
        year: 'numeric'
    }).format(new Date(dateStr));
};

interface TimelineFeedProps {
    posts: ChangelogPost[];
}

export function TimelineFeed({ posts }: TimelineFeedProps) {
    if (!posts || posts.length === 0) {
        return (
            <p className="text-sm text-zinc-500 pl-10">
                Belum ada catatan changelog.
            </p>
        );
    }

    return (
        <div className="relative">
            {/* Absolute Vertical Timeline Line */}
            <div
                className="absolute bottom-0 left-[23px] sm:left-[140px] top-0 w-px bg-white/10"
                aria-hidden="true"
            />

            <div className="flex flex-col">
                {posts.map((post, index) => {
                    const imageUrl = getFirstImage(post.content);

                    return (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative flex flex-col sm:flex-row gap-8 sm:gap-12 pb-20 mb-20 border-b border-white/5 last:border-b-0 last:pb-0"
                        >
                            {/* Left Side: Sticky Date Label */}
                            <div className="sm:w-[150px] shrink-0 relative">
                                {/* Timeline Dot */}
                                <div
                                    className="absolute left-[20px] sm:left-34 sm:-right-[53px] top-1.5 h-2 w-2 rounded-full border border-zinc-400 bg-zinc-800 ring-4 ring-black"
                                    aria-hidden="true"
                                />

                                <time className="sticky top-32 text-[14px] font-mono font-medium text-zinc-500 uppercase tracking-widest pl-12 sm:pl-0 block">
                                    {formatDateString(post.date)}
                                </time>
                            </div>

                            {/* Right Side: Card Content */}
                            <div className="flex-1 pl-12 sm:pl-0 sm:max-w-3xl">

                                {imageUrl && (
                                    <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50">
                                        <img
                                            src={imageUrl}
                                            alt={post.title}
                                            className="w-full h-auto max-h-[400px] object-cover"
                                        />
                                    </div>
                                )}

                                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-4">
                                    {post.title}
                                </h2>

                                <p className="text-[16px] sm:text-lg text-zinc-400 leading-relaxed mb-8">
                                    {post.summary}
                                </p>

                                {post.highlights && post.highlights.length > 0 && (
                                    <ul className="mb-8 flex flex-col gap-3">
                                        {post.highlights.map((highlight, i) => (
                                            <li key={i} className="flex gap-4 text-zinc-300 text-[15px]">
                                                <span className="text-zinc-600 font-mono mt-0.5" aria-hidden="true">&mdash;</span>
                                                <span className="leading-relaxed">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <Link
                                    href={`/changelog/${post.slug}`}
                                    className="inline-flex items-center text-[14px] font-medium text-white hover:text-zinc-300 transition-colors gap-2 group border border-white/10 bg-white/5 px-6 py-2.5 rounded-full"
                                >
                                    Baca Selengkapnya
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>

                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
