import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hubungi Kami | Nalara',
    description: 'Hubungi tim kami untuk pertanyaan, kerja sama, atau masukan tentang platform Direktori AI.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">

            {/* Decorative Blur */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#zinc-400] to-[#zinc-800] dark:from-[#ffffff] dark:to-[#444444] opacity-5 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>

            <div className="mx-auto max-w-2xl px-6 py-20 text-center">
                <h1 className="text-4xl font-semibold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                    Hubungi Kami
                </h1>
                <p className="mt-6 text-lg tracking-tight text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Formulir kontak saat ini sedang dalam tahap pengembangan.
                    Namun, partisipasi Anda sangat berarti bagi kami. Silakan kirimkan pertanyaan, masukan, atau tawaran kerja sama Anda secara langsung melalui email.
                </p>

                <div className="mt-12">
                    <a
                        href="mailto:hello@nalara.dev"
                        className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all inline-flex items-center gap-2 dark:bg-white dark:text-zinc-900 group"
                    >
                        hello@nalara.dev
                        <span className="text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
