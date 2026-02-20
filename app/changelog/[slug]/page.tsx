// app/changelog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';
import { getChangelogs, getChangelogBySlug } from '@/lib/markdown';

// Tipe data baru untuk Next.js 15+ (params adalah Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Generate Static Paths
export async function generateStaticParams() {
  const posts = getChangelogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Dynamic Metadata for SEO (Sudah ditambahkan await params)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; // Membuka Promise
  const post = getChangelogBySlug(resolvedParams.slug);
  
  if (!post) {
    return { title: 'Not Found | Nalara' };
  }

  return {
    title: `${post.title} - Changelog | Nalara`,
    description: post.summary,
  };
}

const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
};

// 3. The Page Component (Diubah menjadi async component & ditambahkan await params)
export default async function ChangelogDetailPage({ params }: Props) {
  const resolvedParams = await params; // Membuka Promise
  const post = getChangelogBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white selection:bg-zinc-200 dark:bg-zinc-950 dark:selection:bg-zinc-800">
      <article className="mx-auto max-w-3xl px-6 py-20 sm:py-32">
        
        {/* Back Button */}
        <Link 
          href="/changelog"
          className="group mb-12 inline-flex items-center gap-2 text-[14px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Kembali ke Changelog
        </Link>

        {/* Header */}
        <header className="mb-14 flex flex-col items-start gap-4 border-b border-zinc-200 pb-10 dark:border-white/10">
          <time 
            dateTime={post.date} 
            className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[13px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
          >
            Dirilis pada {formatDate(post.date)}
          </time>
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-zinc-600 dark:text-zinc-400">
            {post.summary}
          </p>
        </header>

        {/* Markdown Content */}
        <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-img:rounded-xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-white/10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
      </article>
    </main>
  );
}