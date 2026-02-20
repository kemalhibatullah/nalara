// lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// --- Type Definitions ---
export interface ChangelogFrontmatter {
  title: string;
  date: string; // Format: YYYY-MM-DD
  summary: string;
  highlights: string[];
}

export interface ChangelogPost extends ChangelogFrontmatter {
  slug: string;
  content: string;
}

// --- Directory Config ---
const CONTENT_DIR = path.join(process.cwd(), 'content');
const CHANGELOG_DIR = path.join(CONTENT_DIR, 'changelog');

/**
 * Reads, parses, and sorts all changelog markdown files.
 * Optimized for 100% SSG.
 */
export function getChangelogs(): ChangelogPost[] {
  if (!fs.existsSync(CHANGELOG_DIR)) {
    console.warn(`[Directory Missing] Expected changelog directory at: ${CHANGELOG_DIR}`);
    return [];
  }

  const files = fs.readdirSync(CHANGELOG_DIR);

  return files
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(CHANGELOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      const { data, content } = matter(fileContent);
      
      return {
        slug,
        content,
        ...(data as ChangelogFrontmatter),
      };
    })
    // Sort descending (newest month first)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetches a single changelog post by its slug for detail pages.
 */
export function getChangelogBySlug(slug: string): ChangelogPost | null {
  const filePath = path.join(CHANGELOG_DIR, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    content,
    ...(data as ChangelogFrontmatter),
  };
}