"use client";

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { DirectoryItem } from '@/lib/directory';
import { DirectoryCard } from '@/components/DirectoryCard';

export function CategorySearchWrapper({ items, categoryName }: { items: DirectoryItem[], categoryName: string }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

    const filteredAndSortedItems = useMemo(() => {
        let result = items;

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query) ||
                item.author?.toLowerCase().includes(query)
            );
        }

        if (sortBy === "oldest") {
            // Assuming default is newest-first, we reverse for oldest
            result = [...result].reverse();
        }

        return result;
    }, [items, searchQuery, sortBy]);

    return (
        <div className="animate-in fade-in duration-500">
            {/* Action Bar: Search & Sort */}
            <div className="mb-12 flex flex-col sm:flex-row items-center gap-4 justify-between">

                {/* Search Input */}
                <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                        type="text"
                        placeholder={`Cari di kategori ${categoryName}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 transition-all focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 focus:outline-none shadow-[0_0_0_rgba(0,0,0,0)] focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                    />
                </div>

                {/* Sort Dropdown */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                    className="w-full sm:w-auto bg-zinc-900/50 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem top 50%", backgroundSize: "0.65rem auto", paddingRight: "2.5rem" }}
                >
                    <option value="newest">Terbaru (Newest)</option>
                    <option value="oldest">Terlama (Oldest)</option>
                </select>

            </div>

            {/* Results Grid */}
            {filteredAndSortedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredAndSortedItems.map((item) => (
                        <DirectoryCard key={item.slug} item={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-2xl bg-zinc-900/30">
                    <Search className="w-10 h-10 text-zinc-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Tidak ada hasil ditemukan</h3>
                    <p className="text-zinc-500 text-sm max-w-sm">
                        Coba gunakan kata kunci yang berbeda dalam kategori ini.
                    </p>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="mt-6 text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                    >
                        Tampilkan Semua Item
                    </button>
                </div>
            )}
        </div>
    );
}
