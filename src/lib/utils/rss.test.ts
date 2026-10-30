import { describe, expect, test } from 'bun:test';
import { escapeXML, renderFeed } from '#utils/rss';
import { createPost } from '../../test/fixtures.ts';

test('escapeXML', () => {
	expect(escapeXML(`Tom & "Jerry" <'s>`)).toBe('Tom &amp; &quot;Jerry&quot; &lt;&apos;s&gt;');
});

describe('renderFeed', () => {
	const post = createPost({
		id: 'abc',
		slug: 'coal-and-gas',
		title: 'Coal & Gas <now>',
		published: '2024-01-02T10:00:00.000Z',
		content: '<p>Text with ]]> inside</p>',
		quote_content: 'A & B',
		quote_author: 'Someone'
	});
	const feed = renderFeed([post], 'https://example.com/rss.xml');

	test('has an XML declaration and the feed metadata', () => {
		expect(feed.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
		expect(feed).toContain('<atom:link href="https://example.com/rss.xml" rel="self"');
		expect(feed).not.toContain('%%');
	});

	test('escapes titles', () => {
		expect(feed).toContain('<title>Coal &amp; Gas &lt;now&gt;</title>');
	});

	test('uses the publication date', () => {
		expect(feed).toContain('<pubDate>Tue, 02 Jan 2024 10:00:00 GMT</pubDate>');
	});

	test('links to the post', () => {
		expect(feed).toContain('<link>https://example.com/coal-and-gas</link>');
		expect(feed).toContain('<guid isPermaLink="false">abc</guid>');
	});

	test('keeps the CDATA section intact', () => {
		const description = feed.slice(feed.indexOf('<description><![CDATA[<figure>'));
		expect(description).toContain('<blockquote lang="en">A &amp; B</blockquote>');
		expect(description).toContain(']]]]><![CDATA[>');
	});

	test('adds images as media content', () => {
		const withImage = renderFeed(
			[createPost({ image: { url_rss: 'https://img.example/a.jpg?x=1&y=2' } as never })],
			'https://example.com/rss.xml'
		);
		expect(withImage).toContain('<media:content url="https://img.example/a.jpg?x=1&amp;y=2"');
		expect(withImage).toContain('xmlns:media="http://search.yahoo.com/mrss/"');
	});
});
