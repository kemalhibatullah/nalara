'use client';

import { Copy } from 'lucide-react';

export function CopyPromptButton({ content }: { content: string }) {
    return (
        <button
            onClick={() => navigator.clipboard.writeText(content)}
            className="w-full rounded-2xl bg-white/5 border border-white/10 text-white px-8 py-4 text-[15px] font-medium transition-colors hover:bg-white/10 flex items-center justify-center gap-2 group"
        >
            <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" /> Copy Prompt
        </button>
    );
}
