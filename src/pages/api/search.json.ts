import { getCollection } from 'astro:content';

export const GET = async () => {
    const blog = await getCollection('blog');
    
    let searchIndex: any[] = [];
    
    // Strip markdown formatting brutally and aggressively truncate generic bodies
    const stripMd = (text: string) => text.replace(/[#*`~>[\]()-]/g, ' ').replace(/\s+/g, ' ').substring(0, 150) + '...';

    // Process Blogs
    const uniqueTags = new Set();
    blog.forEach(post => {
        searchIndex.push({
            title: post.data.title,
            slug: `/blog/${post.id}`,
            type: 'TERMINAL_LOG',
            body: post.body ? stripMd(post.body) : '',
            tags: post.data.tags || []
        });
        
        if (post.data.tags) {
            post.data.tags.forEach(tag => uniqueTags.add(tag));
        }
    });
    
    // Process Tags natively as standalone search entries
    Array.from(uniqueTags).forEach(tag => {
        searchIndex.push({
            title: `TAG // ${tag}`,
            slug: `/blog/tags/${tag}`,
            type: 'TAG',
            body: `Index of all terminal logs tagged mathematically with the [${tag}] structure.`,
            tags: [tag]
        });
    });
    
    return new Response(JSON.stringify(searchIndex), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
