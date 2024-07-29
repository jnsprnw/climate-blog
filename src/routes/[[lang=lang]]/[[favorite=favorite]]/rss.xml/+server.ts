import { getCurrentPosts } from '$utils/posts';
import { getAbsoluteURL, checkFavorite, generateFeedURL } from '$utils/url';

function insertQuote(post) {
	if (post.quote_content) {
		const author = post.quote_author ? `<figcaption>${post.quote_author}</figcaption>` : '';
		return `<figure><blockquote lang="${post.language.key}">${post.quote_content}</blockquote>${author}</figure>`;
	} else {
		return null;
	}
}

export async function GET({ params }) {
	const { lang, favorite } = params;
	const isFavorite = checkFavorite(favorite);
	const posts = getCurrentPosts(1, isFavorite, lang);

	const items = posts.map((post) => {
		return `
     <item>
       <title>${post.title}</title>
       <link>${getAbsoluteURL(post.slug)}</link>
       <guid isPermaLink="false">${post.id}</guid>
       <pubDate>${new Date(post.created).toUTCString()}</pubDate>
       <description><![CDATA[${[insertQuote(post), post.content].filter(Boolean).join('<br />')}]]></description>
     </item>
     `.trim();
	});

	const xml = `
   	<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
       <channel>
         <title>TODO (${lang}, ${isFavorite})</title>
         <link>${getAbsoluteURL()}</link>
         <atom:link href="${generateFeedURL(lang, isFavorite)}" rel="self" type="application/rss+xml"/>
         <description>TODO</description>
         ${items.join('')}
       </channel>
     </rss>
   	`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
}

export const prerender = true;
