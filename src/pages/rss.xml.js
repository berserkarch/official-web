import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  // Sort by date sequentially backwards
  const sortedPosts = blog.sort((a, b) => {
      const dateA = new Date(a.data.date || new Date()).getTime();
      const dateB = new Date(b.data.date || new Date()).getTime();
      return dateB - dateA;
  });

  return rss({
    title: 'BERSERK_ARCH // TERMINAL_LOG',
    description: 'Master operational terminal log stream detailing system architecture anomalies, routing patches, security vulnerability mitigations, and execution frameworks across the overarching Berserk Arch structure.',
    site: context.site || 'https://berserk-arch.sh',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date ? new Date(post.data.date) : new Date(),
      description: post.data.description || 'Terminal Log entry parsing physical datastream.',
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
