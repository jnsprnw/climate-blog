import { getCurrentPosts } from '$utils/posts';
import { getAbsoluteURL, checkFavorite, generateFeedURL } from '$utils/url';
import { SITE_TITLE, SITE_DESCRIPTION } from '$config';

function insertQuote(post) {
	if (post.quote_content) {
		const author = post.quote_author ? `<figcaption>${post.quote_author}</figcaption>` : '';
		return `<figure><blockquote lang="${post.language.key}">${post.quote_content}</blockquote>${author}</figure>`;
	} else {
		return null;
	}
}

function insertImage(post) {
	if (post.image?.url_rss) {
		return `<media:content xmlns:media="http://search.yahoo.com/mrss/" url="${post.image.url_rss}" medium="image" type="image/jpeg" />`;
	} else {
		return '';
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
       ${insertImage(post)}
       <description><![CDATA[${[insertQuote(post), post.content].filter(Boolean).join('<br />')}]]></description>
     </item>
     `.trim();
	});

	const xml = `
   	<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
       <channel>
         <title>${SITE_TITLE}</title>
         <link>${getAbsoluteURL()}</link>
         <atom:link href="${generateFeedURL(lang, isFavorite)}" rel="self" type="application/rss+xml"/>
         <description>${SITE_DESCRIPTION}</description>
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
