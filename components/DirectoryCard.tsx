import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { DirectoryItem } from '@/lib/directory';

export function DirectoryCard({ item }: { item: DirectoryItem }) {
    const isFallback = !item.resolvedImage || item.resolvedImage.includes('x.com') || item.resolvedImage.includes('twitter.com');

    return (
        <Link
            href={`/directory/${item.slug}`}
            className="group flex flex-col rounded-xl border border-white/10 bg-zinc-900/30 overflow-hidden hover:border-white/20 transition-all duration-300 h-full"
        >
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-zinc-950 border-b border-white/5 overflow-hidden relative">
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
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        {item.isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none transition-all group-hover:bg-black/40">
                                <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-md" strokeWidth={1.5} />
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-medium tracking-wide text-zinc-400 border border-zinc-800 bg-zinc-900/80 px-1.5 py-0.5 rounded-sm uppercase">
                        {item.category}
                    </span>
                    <span className="text-[12px] text-zinc-500 font-medium">
                        {item.author}
                    </span>
                </div>

                <h3 className="font-semibold tracking-tight text-white mb-1.5 leading-snug text-base">
                    {item.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed max-line-2 line-clamp-2">
                    {item.description}
                </p>
            </div>
        </Link>
    );
}
