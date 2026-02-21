"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { DirectoryItem } from '@/lib/directory';

export function InfiniteMarquee({ items }: { items: DirectoryItem[] }) {
    if (!items || items.length === 0) return null;

    // Split items into 2 rows. If less than 6, duplicate all items into both rows to maintain density.
    let row1Items = items.slice(0, Math.ceil(items.length / 2));
    let row2Items = items.slice(Math.ceil(items.length / 2));

    if (items.length < 6) {
        row1Items = [...items];
        row2Items = [...items].reverse();
    }

    // Duplicate 3 times for a seamless infinite loop
    const duplicatedRow1 = [...row1Items, ...row1Items, ...row1Items];
    const duplicatedRow2 = [...row2Items, ...row2Items, ...row2Items];

    const renderCard = (item: DirectoryItem, index: number) => {
        const isFallback = !item.resolvedImage || item.resolvedImage.includes('x.com') || item.resolvedImage.includes('twitter.com');

        return (
            <Link key={`${item.slug}-${index}`} href={`/directory/${item.slug}`} className="w-[220px] sm:w-[280px] flex-shrink-0 group block">
                <div className="flex flex-col">
                    <div className="aspect-[16/10] bg-zinc-900 rounded-2xl overflow-hidden relative border border-white/10 mb-4">
                        {isFallback ? (
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                                <PlayCircle className="w-10 h-10 text-zinc-500 mb-2 group-hover:text-white transition-colors" strokeWidth={1.5} />
                                <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase transition-colors group-hover:text-zinc-400">Video Content</span>
                            </div>
                        ) : (
                            <>
                                <img
                                    src={item.resolvedImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {item.isVideo && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors pointer-events-none">
                                        <PlayCircle className="w-12 h-12 text-white drop-shadow-md" strokeWidth={1.5} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-zinc-200 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-1 font-medium">
                            {item.category} <span className="mx-1">&middot;</span> {item.author}
                        </p>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="w-full overflow-hidden flex flex-col gap-6 py-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>

            {/* Row 1 - Moving Left */}
            <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ["0%", "-33.333%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            >
                {duplicatedRow1.map((item, index) => renderCard(item, index))}
            </motion.div>

            {/* Row 2 - Moving Right (Starts at offset) */}
            <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ["-33.333%", "0%"] }}
                transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            >
                {duplicatedRow2.map((item, index) => renderCard(item, index))}
            </motion.div>

        </div>
    );
}
