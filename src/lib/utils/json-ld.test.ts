import { expect, test } from 'bun:test';
import { SITE_AUTHOR } from '#config';
import { createBlogPostingSchema, serializeSchema } from '#utils/json-ld';
import { createPost } from '../../test/fixtures.ts';

const post = createPost({ slug: 'a-post', title: 'A </script> title' });

test('createBlogPostingSchema', () => {
	expect(createBlogPostingSchema(post)).toMatchObject({
		'@type': 'BlogPosting',
		headline: post.title,
		url: 'https://example.com/a-post',
		author: { '@type': 'Person', name: SITE_AUTHOR },
		datePublished: post.published,
		dateModified: post.updated
	});
});

test('serializeSchema adds the context and cannot break out of the script tag', () => {
	const html = serializeSchema(createBlogPostingSchema(post));
	const json = html.slice('<script type="application/ld+json">'.length, -'</script>'.length);

	expect(json).not.toContain('<');
	expect(JSON.parse(json)).toMatchObject({
		'@context': 'https://schema.org',
		headline: 'A </script> title'
	});
});
