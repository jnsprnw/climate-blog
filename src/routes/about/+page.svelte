<script lang="ts">
	import { getAbsoluteURL } from '$utils/url';
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
	<a href="https://tailwindcss.com/">Tailwind</a>. Special attention was paid to minimal size,
	accessibility and web standards. The CMS for this blog is
	<a href="https://pocketbase.io/">Pocketbase</a> because of its lightness. It runs on
	<a href="https://pockethost.io/">Pockethost.io</a>. The page itself is hosted on
	<a href="https://www.cloudflare.com/">Cloudflare Pages</a>.
</p>
<p>
	The site is set in <a href="https://klim.co.nz/retail-fonts/untitled-sans/">Untitled Sans</a>
	and <a href="https://practicaltypography.com/charter.html">Charter</a>.
</p>
<section>
	<p>If you want to follow the blog, you can do so via RSS feeds:</p>
	<ul class="grid sm:grid-cols-[auto_1fr] gap-x-2 gap-y-2 my-4">
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>Regular feed</span>
			<code class="text-xs bg-slate-50 rounded-sm p-1 place-self-start">
				{getAbsoluteURL('rss.xml')}
			</code>
		</li>
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>Engish posts feed</span>
			<code class="text-xs bg-slate-50 rounded-sm p-1 place-self-start">
				{getAbsoluteURL('en/rss.xml')}
			</code>
		</li>
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>German posts feed</span>
			<code class="text-xs bg-slate-50 rounded-sm p-1 place-self-start">
				{getAbsoluteURL('de/rss.xml')}
			</code>
		</li>
		<li class="grid grid-cols-subgrid sm:col-span-2">
			<span>Favorite posts feed</span>
			<code class="text-xs bg-slate-50 rounded-sm p-1 place-self-start">
				{getAbsoluteURL('favorite/rss.xml')}
			</code>
		</li>
	</ul>
</section>
