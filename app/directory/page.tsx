import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DirectoryItem, getDirectoryItems } from '@/lib/directory';
import { DirectorySearchWrapper } from '@/components/DirectorySearchWrapper';

export const metadata: Metadata = {
    title: 'Direktori AI | Nalara Marketplace',
    description: 'Koleksi tools, promt, tutorial, dan sumber daya AI pilihan.',
};



// ----------------------------------------------------------------------
// Main Server Component
// ----------------------------------------------------------------------
export default async function DirectoryPage() {
    const allItems = await getDirectoryItems();

    const featuredItems = allItems.filter(item => item.featured);
    const promptItems = allItems.filter(item => item.category === 'Prompt');
    const toolItems = allItems.filter(item => item.category === 'Tool');
    const tutorialItems = allItems.filter(item => item.category === 'Tutorial');
    const inspirasiItems = allItems.filter(item => item.category === 'Inspirasi');

    return (
        <main className="min-h-screen bg-black selection:bg-zinc-800 selection:text-white font-sans max-w-[100vw] overflow-hidden">
            <div className="mx-auto max-w-7xl pt-24 sm:pt-32">

                {/* Minimalist Page Header */}
                <header className="mb-20 max-w-3xl px-6 sm:px-0">
                    <h1 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl mb-4">
                        Directory AI
                    </h1>
                    <p className="text-lg tracking-tight text-zinc-400 leading-relaxed font-normal">
                        Koleksi postingan AI, kebanyakan dari X, ada tutorial, prompt, update AI, sampe tips AI, search aja deh.
                    </p>
                </header>

                {/* Client Wrapper for Search & Discovery */}
                <DirectorySearchWrapper
                    allItems={allItems}
                    featuredItems={featuredItems}
                    promptItems={promptItems}
                    toolItems={toolItems}
                    tutorialItems={tutorialItems}
                    inspirasiItems={inspirasiItems}
                />

            </div>
        </main>
    );
}
