import { SITE_TITLE } from '#config';
import type { Post } from '#types/post';
import { getPageDescription } from '#utils/posts';
import { getAbsoluteURL } from '#utils/url';

export function escapeXML(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

// CDATA sections cannot contain `]]>`, so it is split across two sections
function cdata(value: string): string {
	return `<![CDATA[${value.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

function renderQuote(post: Post): string | undefined {
	if (!post.quote_content) {
		return undefined;
	}
	const author = post.quote_author
		? `<figcaption>${escapeXML(post.quote_author)}</figcaption>`
		: '';
	return `<figure><blockquote lang="${post.language.key}">${escapeXML(post.quote_content)}</blockquote>${author}</figure>`;
}

function renderImage(post: Post): string {
	if (!post.image?.url_rss) {
		return '';
	}
	return `<media:content url="${escapeXML(post.image.url_rss)}" medium="image" type="image/jpeg" />`;
}

function renderItem(post: Post): string {
	const description = [renderQuote(post), post.content].filter(Boolean).join('<br />');
	return [
		'<item>',
		`<title>${escapeXML(post.title)}</title>`,
		`<link>${getAbsoluteURL(post.slug)}</link>`,
		`<guid isPermaLink="false">${post.id}</guid>`,
		`<pubDate>${new Date(post.published).toUTCString()}</pubDate>`,
		renderImage(post),
		`<description>${cdata(description)}</description>`,
		'</item>'
	]
		.filter(Boolean)
		.join('');
}

export function renderFeed(posts: Post[], feedURL: string): string {
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">',
		'<channel>',
		`<title>${escapeXML(SITE_TITLE)}</title>`,
		`<link>${getAbsoluteURL()}</link>`,
		`<atom:link href="${escapeXML(feedURL)}" rel="self" type="application/rss+xml"/>`,
		`<description>${escapeXML(getPageDescription(false))}</description>`,
		...posts.map(renderItem),
		'</channel>',
		'</rss>'
	].join('\n');
}
