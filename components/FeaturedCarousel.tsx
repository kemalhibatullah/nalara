'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { DirectoryItem } from '@/lib/directory';

export function FeaturedCarousel({ items }: { items: DirectoryItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!items || items.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % items.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [items]);

    if (!items || items.length === 0) return null;

    const dots = Array.from({ length: items.length }).map((_, i) => i);

    return (
        <section className="mb-24 px-6 sm:px-0 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Featured
                </h2>
                {/* Dot Indicators */}
                <div className="flex gap-2">
                    {dots.map((dot) => (
                        <button
                            key={dot}
                            onClick={() => setActiveIndex(dot)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === dot ? 'w-4 bg-white' : 'w-1.5 bg-zinc-600 hover:bg-zinc-500'
                                }`}
                            aria-label={`Go to slide ${dot + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <motion.div
                    className="flex gap-6"
                    animate={{ x: `calc(-${activeIndex * 100}% - ${activeIndex * 1.5}rem)` }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                    {items.map((item) => {
                        const isFallback = !item.resolvedImage || item.resolvedImage.includes('x.com') || item.resolvedImage.includes('twitter.com');
                        return (
                            <div
                                key={item.slug}
                                className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333333%-1rem)]"
                            >
                                <Link href={`/directory/${item.slug}`} className="group block">
                                    <div className="flex flex-col gap-4">
                                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/10">
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
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
                                            <h3 className="text-lg font-semibold text-white tracking-tight mb-1 group-hover:text-zinc-200 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-zinc-400">
                                                {item.category} <span className="mx-1">&middot;</span> {item.author}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
