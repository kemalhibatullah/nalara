// app/changelog/page.tsx
import { Metadata } from 'next';
import { getChangelogs } from '@/lib/markdown';
import { ChangelogCard } from '@/components/ChangelogCard';

export const metadata: Metadata = {
  title: 'Changelog | AI Directory',
  description: 'Pembaruan harian, perilisan model terbaru, dan inovasi di dunia Artificial Intelligence.',
};

export default function ChangelogPage() {
  const changelogs = getChangelogs();

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-32">
        
        {/* Page Header */}
        <header className="mb-16 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Changelog AI
          </h1>
          <p className="mt-4 text-base tracking-tight text-zinc-600 dark:text-zinc-400">
            Pembaruan terbaru dari ekosistem AI. Melacak perilisan model, tools baru, 
            dan perkembangan industri hari demi hari.
          </p>
        </header>

        {/* Timeline Layout */}
        <div className="relative">
          
          {/* Vertical Timeline Line with Fade Gradients */}
          {/* Fades to transparent at the top and bottom for a seamless look */}
          <div 
            className="absolute bottom-0 left-[11px] top-0 w-px bg-zinc-200 dark:bg-white/10"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)'
            }}
            aria-hidden="true"
          />

          {/* Render Changelog Items */}
          <div className="flex flex-col gap-12">
            {changelogs.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 pl-10">
                Belum ada catatan changelog.
              </p>
            ) : (
              changelogs.map((post) => (
                <div key={post.slug} className="relative pl-10 sm:pl-12">
                  
                  {/* Glowing Timeline Node (Dot) */}
                  {/* ring-4 creates the cut-out effect against the vertical line */}
                  <div 
                    className="absolute left-2 top-6 h-2 w-2 rounded-full border border-zinc-400 bg-white ring-4 ring-white dark:border-white/30 dark:bg-zinc-800 dark:ring-zinc-950 dark:shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                    aria-hidden="true"
                  />

                  {/* Render the Card passing the post data */}
                  <div className="group/item">
                    <ChangelogCard 
                      post={{
                        slug: post.slug,
                        title: post.title,
                        date: post.date,
                        category: post.category,
                        impact: post.impact,
                        source_url: post.source_url,
                        tags: post.tags,
                      }} 
                    />
                  </div>

                </div>
              ))
            )}
          </div>
          
        </div>
      </div>
    </main>
  );
}