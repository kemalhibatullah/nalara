import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Tweet } from 'react-tweet';
import { getDirectoryItemBySlug, getDirectoryItems } from '@/lib/directory';
import { CopyPromptButton } from '@/components/CopyPromptButton';

export async function generateStaticParams() {
    const items = await getDirectoryItems();
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const item = await getDirectoryItemBySlug(resolvedParams.slug);
    if (!item) return { title: 'Not Found' };

    return {
        title: `${item.title} | Nalara Direktori`,
        description: item.description,
    };
}

export default async function DirectoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const item = await getDirectoryItemBySlug(resolvedParams.slug);

    if (!item) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black selection:bg-zinc-800 selection:text-white font-sans pt-24 pb-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* LEFT COLUMN: Media & Markdown Content */}
                    <div className="col-span-1 lg:col-span-7 flex flex-col">

                        {/* Massive Media Hero */}
                        {(() => {
                            const getTweetId = (url: string) => {
                                const match = url?.match(/status\/(\d+)/);
                                return match ? match[1] : null;
                            };
                            const tweetId = getTweetId(item.imageUrl) || getTweetId(item.sourceUrl);

                            if (tweetId) {
                                return (
                                    <div className="mb-8 w-full flex justify-center bg-zinc-950/50 border border-white/5 rounded-2xl p-4 overflow-hidden" data-theme="dark">
                                        <Tweet id={tweetId} />
                                    </div>
                                );
                            }

                            return (
                                <div className="w-full aspect-video sm:aspect-[4/3] rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden mb-12">
                                    <img
                                        src={item.resolvedImage || item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            );
                        })()}

                        {/* Markdown Body */}
                        <article className="prose prose-invert prose-zinc max-w-none prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-white pb-20 border-b border-white/5 lg:border-none">
                            <ReactMarkdown>
                                {item.content}
                            </ReactMarkdown>
                        </article>

                    </div>

                    {/* RIGHT COLUMN: Sticky Sidebar Metadata */}
                    <div className="col-span-1 lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-32 flex flex-col">

                            <div className="mb-8">
                                <span className="inline-block border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 rounded-sm text-[12px] font-mono font-medium tracking-wide text-zinc-400 uppercase mb-5">
                                    {item.category}
                                </span>

                                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white leading-[1.1] mb-5">
                                    {item.title}
                                </h1>

                                <p className="text-[16px] text-zinc-400 leading-relaxed mb-6">
                                    {item.description}
                                </p>

                                <div className="flex items-center gap-2 text-[14px] text-zinc-500 font-medium">
                                    Ditemukan dari: <span className="text-zinc-300">{item.author}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                                <a
                                    href={item.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full rounded-2xl bg-white text-black px-8 py-4 text-[15px] font-medium transition-colors hover:bg-zinc-200 flex items-center justify-center gap-2 group"
                                >
                                    Kunjungi Sumber Asli
                                    <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </a>

                                {item.category === 'Prompt' && (
                                    <CopyPromptButton content={item.content} />
                                )}
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
