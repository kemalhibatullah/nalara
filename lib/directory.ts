import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getTweet } from 'react-tweet/api';

const DIRECTORY_BASE = path.join(process.cwd(), 'content/directory');
const SUBFOLDERS = ['prompt', 'tutorial', 'tool', 'inspirasi'];

export interface DirectoryItem {
    slug: string;
    title: string;
    category: 'Prompt' | 'Tutorial' | 'Tool' | 'Inspirasi';
    author: string;
    sourceUrl: string;
    imageUrl: string;
    description: string;
    featured?: boolean;
    content: string;
    resolvedImage?: string;
    isVideo?: boolean;
}

export async function getDirectoryItems(): Promise<DirectoryItem[]> {
    if (!fs.existsSync(DIRECTORY_BASE)) {
        return [];
    }

    const allItems: DirectoryItem[] = [];

    for (const folder of SUBFOLDERS) {
        const folderPath = path.join(DIRECTORY_BASE, folder);

        if (fs.existsSync(folderPath)) {
            const fileNames = fs.readdirSync(folderPath);

            const itemsInFolderPromises = fileNames
                .filter((fileName) => fileName.endsWith('.md'))
                .map(async (fileName) => {
                    const slug = fileName.replace(/\.md$/, '');
                    const fullPath = path.join(folderPath, fileName);
                    const fileContents = fs.readFileSync(fullPath, 'utf8');

                    const { data, content } = matter(fileContents);

                    let resolvedImage = data.imageUrl;
                    let isVideo = false;

                    const tweetId = data.imageUrl?.match(/status\/(\d+)/)?.[1] || data.sourceUrl?.match(/status\/(\d+)/)?.[1];

                    if (tweetId) {
                        try {
                            const tweet = await getTweet(tweetId);
                            if (tweet) {
                                isVideo = !!tweet.video;
                                resolvedImage = tweet.video?.poster || tweet.photos?.[0]?.url || data.imageUrl;
                            }
                        } catch (error) {
                            console.error(`Failed to fetch tweet ${tweetId}:`, error);
                        }
                    }

                    return {
                        slug,
                        title: data.title,
                        category: data.category,
                        author: data.author,
                        sourceUrl: data.sourceUrl,
                        imageUrl: data.imageUrl,
                        description: data.description,
                        featured: data.featured || false,
                        content,
                        resolvedImage,
                        isVideo,
                    } as DirectoryItem;
                });

            const resolvedItemsInFolder = await Promise.all(itemsInFolderPromises);
            allItems.push(...resolvedItemsInFolder);
        }
    }

    return allItems;
}

export async function getDirectoryItemBySlug(slug: string): Promise<DirectoryItem | undefined> {
    const items = await getDirectoryItems();
    return items.find((item) => item.slug === slug);
}
