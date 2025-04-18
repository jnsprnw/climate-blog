<script lang="ts">
	import { getAbsoluteURL } from '$utils/url';
	import { KEY_ALL_POSTS } from '$config';
	import URL from './URL.svelte';
</script>

<section>
	<p>
		This is a personal blog by <a rel="author" href="https://jonasparnow.com">Jonas Parnow</a>. It
		serves as a personal archive of artefacts related to the climate crisis. At best, it also
		provides others with an imperfectly categorised and somewhat chronological perspective.
	</p>
</section>
<p>
	This blog is built with <a href="https://kit.svelte.dev/">SvelteKit</a> and
	<a href="https://tailwindcss.com/">Tailwind</a>. Special attention was paid to minimal size (e.g.
	prerendering and no JavaScript), accessibility (e.g. semantic tags) and web standards (e.g.
	Schema.org formats). The CMS for this blog is
	<a href="https://pocketbase.io/">Pocketbase</a> because of its lightness. It runs on
	<a href="https://pockethost.io/">Pockethost.io</a>. The page itself is hosted on
	<a href="https://www.cloudflare.com/">Cloudflare Pages</a>. You can find the source code on
	<a href="https://github.com/jnsprnw/climate-blog">GitHub</a>.
</p>
<p>
	The site is set in <a href="https://klim.co.nz/retail-fonts/untitled-sans/">Untitled Sans</a>
	and <a href="https://practicaltypography.com/charter.html">Charter</a>.
</p>
<section>
	<h2 class="font-semibold mb-4">RSS feed of the collection</h2>
	<p>If you want to follow the blog, you can do so via RSS feeds:</p>
	<ul class="grid sm:grid-cols-[auto_1fr] gap-x-2 gap-y-2 my-4">
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>Regular feed</span>
			<URL url="rss.xml" />
		</li>
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>Engish posts feed</span>
			<URL url="en/rss.xml" />
		</li>
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>German posts feed</span>
			<URL url="de/rss.xml" />
		</li>
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>Favorite posts feed</span>
			<URL url="favorite/rss.xml" />
		</li>
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>Favorite English posts feed</span>
			<URL url="en/favorite/rss.xml" />
		</li>
	</ul>
</section>
<section>
	<h2 class="font-semibold mb-4">Links to the collection</h2>
	<ul class="grid gap-y-2 my-4">
		<li>
			<a class="link" href={getAbsoluteURL('/')}>Regular feed</a>
		</li>
		<li>
			<a class="link" href={getAbsoluteURL('/en')}>English feed</a>
		</li>
		<li>
			<a class="link" href={getAbsoluteURL('/de')}>German feed</a>
		</li>
		<li>
			<a class="link" href={getAbsoluteURL('/favorite')}>Favorite posts feed</a>
		</li>
		<li>
			<a class="link" href={getAbsoluteURL('/en/favorite')}>Favorite English posts feed</a>
		</li>
		<li>
			<a class="link" href={getAbsoluteURL('/', true)}>Regular feed without images shown</a>
		</li>
		<li>
			<a class="link" href={getAbsoluteURL(`/${KEY_ALL_POSTS}`)}>All posts shown</a>
		</li>
	</ul>
</section>
