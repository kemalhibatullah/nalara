// components/ChangelogCard.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ChangelogPost } from '@/lib/markdown';

interface ChangelogCardProps {
  post: Omit<ChangelogPost, 'content'>;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    month: 'long',
    year: 'numeric',
  }).format(date); // Renders like: "Januari 2025"
};

export function ChangelogCard({ post }: ChangelogCardProps) {
  return (
    <article className="group relative flex flex-col items-start justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-950/50 dark:hover:border-white/20 dark:hover:bg-zinc-900/50">
      
      {/* Absolute Link covering the entire card for better mobile/desktop UX */}
      <Link href={`/changelog/${post.slug}`} className="focus:outline-none">
        <span className="absolute inset-0 z-10" aria-hidden="true" />
      </Link>

      <div className="flex w-full flex-col gap-4">
        {/* Header: Title & Date */}
        <div className="flex flex-col gap-1">
          <time dateTime={post.date} className="text-[13px] font-medium tracking-tight text-zinc-500 dark:text-zinc-400">
            {formatDate(post.date)}
          </time>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h3>
        </div>

        {/* Summary */}
        <p className="text-[15px] leading-relaxed tracking-tight text-zinc-600 dark:text-zinc-300">
          {post.summary}
        </p>

        {/* Highlights List */}
        {post.highlights && post.highlights.length > 0 && (
          <ul className="mt-2 flex flex-col gap-2.5">
            {post.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3 text-[14px] tracking-tight text-zinc-600 dark:text-zinc-400">
                <span className="mt-[6px] h-px w-3 shrink-0 bg-zinc-300 dark:bg-zinc-600" aria-hidden="true" />
                <span className="leading-snug">{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Link (Visual only, actual linking handled by absolute span above) */}
      <div className="mt-8 flex w-full items-center border-t border-zinc-100 pt-4 dark:border-white/5">
        <div className="flex items-center gap-1.5 text-[14px] font-medium text-zinc-900 dark:text-zinc-100">
          Lihat Detail Lengkap
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
      
    </article>
  );
}