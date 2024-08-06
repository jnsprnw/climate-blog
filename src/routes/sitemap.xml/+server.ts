import { SitemapStream, streamToPromise } from 'sitemap';
import posts from '$posts';
import { getLastMod } from '$utils/posts';
import { getAbsoluteURL } from '$utils/url';

export async function GET() {
	const sitemap = new SitemapStream({ hostname: getAbsoluteURL() });

	sitemap.write({ url: `/`, lastmod: getLastMod(posts) });
	sitemap.write({ url: `/about` });

	posts.forEach((post) => {
		sitemap.write({
			url: getAbsoluteURL(post.slug),
			lastmod: post.updated
		});
	});

	sitemap.end();

	const content = await streamToPromise(sitemap);

	return new Response(content.toString(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}

export const prerender = true;
