import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import { getDirectoryItems } from '@/lib/directory';
import { CategorySearchWrapper } from '@/components/CategorySearchWrapper';

export async function generateStaticParams() {
    // We only have 4 explicit categories for now
    const categories = ['prompt', 'tool', 'tutorial', 'inspirasi'];
    return categories.map((category) => ({
        category: category,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const categoryName = resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1);
    return {
        title: `${categoryName} AI | Nalara Archive`,
        description: `Koleksi lengkap ${categoryName} terbaik dari komunitas.`,
    };
}

export default async function CategoryArchivePage({ params }: { params: Promise<{ category: string }> }) {
    const resolvedParams = await params;
    const rawCategory = resolvedParams.category;

    // Validate category
    const validCategories = ['prompt', 'tool', 'tutorial', 'inspirasi'];
    if (!validCategories.includes(rawCategory)) {
        notFound();
    }

    const allItems = await getDirectoryItems();
    const categoryItems = allItems.filter(item => item.category.toLowerCase() === rawCategory);
    const displayCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

    return (
        <main className="min-h-screen bg-black selection:bg-zinc-800 selection:text-white font-sans pt-24 pb-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header Section */}
                <header className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-white mb-4">
                        {displayCategory} AI
                    </h1>
                    <p className="text-lg tracking-tight text-zinc-400 leading-relaxed font-normal">
                        Koleksi lengkap {displayCategory} terbaik dari komunitas.
                    </p>
                </header>

                {/* Interactive Search & Sort Wrapper */}
                <CategorySearchWrapper items={categoryItems} categoryName={displayCategory} />

            </div>
        </main>
    );
}
