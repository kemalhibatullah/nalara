"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { DirectoryItem } from '@/lib/directory';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { DirectoryCard } from '@/components/DirectoryCard';

// ----------------------------------------------------------------------
// Local Component for Rendering Stacked Sections (Compact Grid)
// ----------------------------------------------------------------------
function DirectorySection({ title, items, categoryPath }: { title: string, items: DirectoryItem[], categoryPath: string }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="mb-24 px-6 sm:px-0">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {title}
                </h2>
                <Link
                    href={`/directory/c/${categoryPath}`}
                    className="group flex items-center gap-1.5 text-[14px] font-medium text-zinc-400 hover:text-white transition-colors"
                >
                    Lihat Semua <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            {/* Compact 4-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                    <DirectoryCard key={item.slug} item={item} />
                ))}
            </div>
        </section>
    );
}

export function DirectorySearchWrapper({
    allItems,
    featuredItems,
    promptItems,
    toolItems,
    tutorialItems,
    inspirasiItems
}: {
    allItems: DirectoryItem[],
    featuredItems: DirectoryItem[],
    promptItems: DirectoryItem[],
    toolItems: DirectoryItem[],
    tutorialItems: DirectoryItem[],
    inspirasiItems: DirectoryItem[]
}) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const trendingTags = ["#VibeCoding", "#Midjourney", "#Cursor", "#Nextjs"];

    const handleSurpriseMe = () => {
        if (!allItems || allItems.length === 0) return;
        const randomIndex = Math.floor(Math.random() * allItems.length);
        const randomItem = allItems[randomIndex];
        router.push(`/directory/${randomItem.slug}`);
    };

    const isSearching = searchQuery.trim().length > 0;

    const searchResults = isSearching
        ? allItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className="animate-in fade-in duration-500">
            {/* Search & Discovery Header UI */}
            <div className="mb-16 px-6 sm:px-0">
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1 max-w-2xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-zinc-500" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari prompt, tutorial, tools..."
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-500 transition-all duration-300 focus:outline-none focus:bg-zinc-900 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 focus:shadow-[0_0_40px] focus:shadow-indigo-500/40"
                        />
                    </div>
                    <button
                        onClick={handleSurpriseMe}
                        className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3.5 rounded-xl transition-all font-medium whitespace-nowrap active:scale-95 flex items-center justify-center gap-2"
                    >
                        Inspirasi Acak ✨
                    </button>
                </div>

                {/* Trending Tags */}
                {!isSearching && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-zinc-500 mr-2 uppercase tracking-wide">Trending:</span>
                        {trendingTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag.replace('#', ''))}
                                className="text-xs text-zinc-400 hover:text-white border border-white/5 bg-white/5 rounded-full px-3 py-1 cursor-pointer transition-colors active:scale-95"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Dynamic Rendering Logic */}
            {isSearching ? (
                <section className="px-6 sm:px-0 min-h-[50vh]">
                    <h2 className="text-xl font-medium tracking-tight text-white mb-8">
                        Hasil pencarian untuk <span className="text-zinc-400">"{searchQuery}"</span>
                        <span className="ml-3 text-sm text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">{searchResults.length}</span>
                    </h2>

                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {searchResults.map((item) => (
                                <DirectoryCard key={item.slug} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-2xl bg-zinc-900/20">
                            <Search className="w-12 h-12 text-zinc-700 mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">Tidak ada hasil ditemukan</h3>
                            <p className="text-zinc-500 text-sm max-w-sm">
                                Coba gunakan kata kunci yang berbeda atau telusuri kategori yang tersedia.
                            </p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-6 text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            >
                                Bersihkan Pencarian
                            </button>
                        </div>
                    )}
                </section>
            ) : (
                <div className="animate-in fade-in duration-700">
                    {/* Featured Horizontal Carousel */}
                    <FeaturedCarousel items={featuredItems} />

                    {/* Vertically Stacked Sections (Limited to 8 items each) */}
                    <DirectorySection title="Pilihan Prompt" items={promptItems.slice(0, 8)} categoryPath="prompt" />
                    <DirectorySection title="Tools Unggulan" items={toolItems.slice(0, 8)} categoryPath="tool" />
                    <DirectorySection title="Tutorial Masterclass" items={tutorialItems.slice(0, 8)} categoryPath="tutorial" />
                    <DirectorySection title="Inspirasi Design" items={inspirasiItems.slice(0, 8)} categoryPath="inspirasi" />
                </div>
            )}
        </div>
    );
}
