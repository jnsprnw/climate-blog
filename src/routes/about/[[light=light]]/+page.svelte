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
<section>
	<p>
		This website is both playground and a counter approach to current web trends. Many websites
		today are user hostile and are wastefully using resources. This website tries to go another way
		by following these principles:
	</p>
	<ul class="list-outside marker:text-accent ml-6 list-['–__'] my-2 space-y-2">
		<li>This website uses no tracking.</li>
		<li>This website has no ads.</li>
		<li>This website uses no cookies.</li>
		<li>There are no pop-ups.</li>
		<li>It doesn’t ask you to subscribe.</li>
		<li>
			There is no way to rate this website. So I’m not asking you to give me a thumbs-up or leave a
			comment.
		</li>
		<li>
			If you wish, you can subscribe via RSS. This way, you can subscribe just to the content you
			are interested in. <a href="#rss-feeds">Find instructions further down.</a>
		</li>
		<li>This blog is not a newsletter. There is no premium content.</li>
		<li>
			New content on this blog is not sheduled but produced if I find the time and find some
			valuable to add.
		</li>
		<li>Content addition is driven by friction and slowness. No breaking news.</li>
		<li>Old posts are updated and corrected. Think of care rather than disruption.</li>
		<li>
			The website is self-hosted and not dependent on a service that could be sold to a billionaire
			or exploited by underlying algorithms. Technically, yes, it’s hosted on Cloudflare and stored
			on GitHub, but I still have control over the content.
		</li>
		<li><a href="/all">All posts can be viewed on the same page.</a></li>
		<li>Blog posts have header images if they are relevant. Not some stock photo.</li>
		<li>All Images have alt text, captions and sources.</li>
		<li>
			Images are delivered in modern formats and responsive sizes to minimize traffic. Images are
			delivered in modern formats and responsive sizes to minimise traffic. Yes, I will leave
			Cloudinary if I can find the time to set up my own system.
		</li>
		<li>This website uses semantic tags.</li>
		<li>The website’s design has high contrast.</li>
		<li>No JavaScript is shipped or needed.</li>
		<li>Everything is pre-rendered. It’s just a static site.</li>
		<li><a href="/light">This blog provides a light theme that does not display images.</a></li>
		<li>
			The fonts used on this website are <a href="https://everythingfonts.com/subsetter"
				>subsetted</a
			>. <a href="https://everythingfonts.com/subsetter">Find out more about this technique.</a>
		</li>
		<li>
			You can filter the content to your liking. <a href="#filter">See the instructions below.</a>
		</li>
		<li>There is a description of why related posts are related.</li>
		<li>
			It’s easy to navigate away from this website to others. Instead of copying their content, I’m
			linking to other pages.
		</li>
		<li>
			This website is <a href="https://github.com/jnsprnw/climate-blog">open source</a>.
		</li>
	</ul>
</section>

<section>
	<p>
		This blog is built with <a href="https://kit.svelte.dev/">SvelteKit</a> and
		<a href="https://tailwindcss.com/">Tailwind</a>. The CMS for this blog is
		<a href="https://pocketbase.io/">Pocketbase</a> because of its lightness. It runs on
		<a href="https://pockethost.io/">Pockethost.io</a>. The page itself is hosted on
		<a href="https://www.cloudflare.com/">Cloudflare Pages</a>.
	</p>

	<p>
		The site is set in <a href="https://klim.co.nz/retail-fonts/untitled-sans/">Untitled Sans</a>
		and <a href="https://practicaltypography.com/charter.html">Charter</a>.
	</p>
</section>
<section>
	<h2 class="font-semibold mb-4" id="rss-feeds">RSS feed of the collection</h2>
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
	<h2 class="font-semibold mb-4" id="filter">Links to the collection</h2>
	<ul class="grid gap-y-2 my-4">
		<li>
			<a href={getAbsoluteURL('/')}>Regular feed</a>
		</li>
		<li>
			<a href={getAbsoluteURL('/en')}>English feed</a>
		</li>
		<li>
			<a href={getAbsoluteURL('/de')}>German feed</a>
		</li>
		<li>
			<a href={getAbsoluteURL('/favorite')}>Favorite posts feed</a>
		</li>
		<li>
			<a href={getAbsoluteURL('/en/favorite')}>Favorite English posts feed</a>
		</li>
		<li>
			<a href={getAbsoluteURL('/', true)}>Regular feed without images shown</a>
		</li>
		<li>
			<a href={getAbsoluteURL(`/${KEY_ALL_POSTS}`)}>All posts shown</a>
		</li>
	</ul>
</section>
