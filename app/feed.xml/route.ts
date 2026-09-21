import { BLOG_POSTS } from '@/lib/blog';
import { siteConfig } from '@/config/site';

export async function GET() {
  const posts = Object.values(BLOG_POSTS);
  const siteUrl = siteConfig.url;

  const rssItemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${post.category}</category>
      <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/"><![CDATA[${post.author}]]></dc:creator>
    </item>`;
    })
    .join('');

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NorAI Engineering Journal</title>
    <link>${siteUrl}/blog</link>
    <description>Practical technical notes on AI agent orchestration, vector retrieval, and developer tooling.</description>
    <language>en-US</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(rssFeedXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
