import { posts } from '$lib/posts'

function render(posts) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>1000experiments.dev</title>
  <link>https://1000experiments.dev</link>
  <description>List of experiments</description>
  <image>
    <url>https://1000experiments.dev/favicon.png</url>
    <title>1000experiments.dev</title>
    <link>https://1000experiments.dev</link>
  </image>
  ${posts
    .map(
      (post) => `
        <item>
          <title>${encodeHTML(post.title)}</title>
          <link>https://1000experiments.dev/posts/${post.permalink}</link>
          <description><![CDATA[
            <a href="https://1000experiments.dev/posts/${post.permalink}">link</a>
          ]]></description>
          <pubDate>${post.date.toUTCString()}</pubDate>
        </item>
      `
    )
    .join('\n')}
</channel>
</rss>`
}

function encodeHTML(text) {
  return text.replace(/[\u00A0-\u9999<>\&]/g, i =>
    '&#'+i.charCodeAt(0)+';'
  )
}

export function get() {
  const feed = render(posts)

  return {
    body: feed,
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
      'Content-Type': 'application/rss+xml'
    }
  }
}
