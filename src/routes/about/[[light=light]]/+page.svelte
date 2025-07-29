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
			The fonts used on this website are <a href="https://everythingfonts.com/subsetter">
				subsetted
			</a>. <a href="https://everythingfonts.com/subsetter">Find out more about this technique.</a>
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
	<p>Many of these principles are inspired by the following articles/projects/websites:</p>
	<ul class="list-outside marker:text-accent ml-6 list-['–__'] my-2 space-y-2">
		<li>
			<a href="https://www.noemamag.com/we-need-to-rewild-the-internet/">
				We Need To Rewild The Internet
			</a>
			(<a href="https://netzpolitik.org/2024/essay-wir-muessen-zurueck-zum-wilden-internet/">
				German translation
			</a>)
		</li>
		<li>
			<a href="https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/">
				Low-Tech Magazine: How to Build a Low-tech Website?
			</a>
		</li>
		<li>
			<a
				href="https://unframed.lacma.org/2025/04/21/cleaner-faster-greener-rethinking-how-we-build-websites"
			>
				Cleaner, Faster, Greener: Rethinking How We Build Websites
			</a>
		</li>
		<li>
			<a href="https://rachelbythebay.com/w/2025/01/04/cruft/">
				Web page annoyances that I don't inflict on you here
			</a>
		</li>
		<li>
			<a href="https://www.youtube.com/watch?v=OFRjZtYs3wY">
				Tom Scott: Why The Web Is Such A Mess
			</a>
		</li>
		<li><a href="https://justfuckingusehtml.com/">Just fucking use HTML</a></li>
		<li><a href="https://brutalist-web.design/">Guidelines for Brutalist Web Design</a></li>
		<li>
			<a href="https://perfectmotherfuckingwebsite.com/">
				This is the final motherfucking website.
			</a>
		</li>
		<li>
			<a href="https://seirdy.one/posts/2020/11/23/website-best-practices/">
				Best practices for inclusive textual websites
			</a>
		</li>
		<li>
			<a href="https://shkspr.mobi/blog/2021/01/the-unreasonable-effectiveness-of-simple-html/">
				The unreasonable effectiveness of simple HTML
			</a>
		</li>
		<li>
			<a href="https://frankgroeneveld.nl/2021/08/24/most-underused-browser-feature/">
				The most underused browser feature
			</a>
		</li>
		<li>
			<a href="https://tantek.com/2015/069/t1/js-dr-javascript-required-dead">
				js;dr = JavaScript required; Didn’t Read.
			</a>
		</li>
		<li>
			<a href="https://www.kryogenix.org/code/browser/everyonehasjs.html">
				Everyone has JavaScript, right?
			</a>
		</li>
		<li>
			<a href="https://danluu.com/web-bloat/">
				How web bloat impacts users with slow connections
			</a>
		</li>
		<li>
			<a href="https://1mb.club/"> 1MB Club </a>
		</li>
		<li>
			<a
				href="https://reedybear.bearblog.dev/ive-been-advocating-for-rss-support-and-you-should-too/"
			>
				I've been advocating for RSS support, and you should too
			</a>
		</li>
		<li>
			<a href="https://www.smashingmagazine.com/2021/09/reducing-carbon-emissions-on-web/">
				Reducing Carbon Emissions On The Web
			</a>
		</li>
		<li>
			<a href="https://publicinfrastructure.org/2023/03/29/the-three-legged-stool/">
				The Three-Legged Stool: A Manifesto for a Smaller, Denser Internet
			</a>
		</li>
		<li>
			<a href="https://rohan.ga/blog/early-internet/">
				I Wish I Didn't Miss the '90s-00s Internet
			</a>
		</li>
		<li>
			<a
				href="https://english.elpais.com/lifestyle/2025-01-07/the-internet-hasnt-made-us-bad-we-were-already-like-that-the-mistake-of-yearning-for-the-friendly-online-world-of-20-years-ago.html"
			>
				‘The internet hasn’t made us bad, we were already like that’: The mistake of yearning for
				the ‘friendly’ online world of 20 years ago
			</a>
		</li>
		<li>
			<a href="https://vhsoverdrive.neocities.org/essays/oldweb">
				An Argument for a Return to Web 1.0
			</a>
		</li>
		<li>
			<a href="https://github.com/Organic-Basics/ob-low-impact-website">
				The Low Impact version of the Organic Basics website
			</a>
		</li>
		<li>
			<a href="https://lars-christian.com/posts/2024-07-22-re-do-people-irl-know-you-have-a-blog/">
				Re: Do people IRL know you have a blog?
			</a>
		</li>
	</ul>
</section>

<section>
	<p>
		This blog is built with <a href="https://kit.svelte.dev/">SvelteKit</a> and
		<a href="https://tailwindcss.com/">Tailwind</a>. The CMS for this blog is
		<a href="https://pocketbase.io/">Pocketbase</a>. It runs on
		<a href="https://pockethost.io/">Pockethost.io</a>. The page itself is hosted on
		<a href="https://www.cloudflare.com/">Cloudflare Pages</a>. Find the source code on
		<a href="https://github.com/jnsprnw/climate-blog">GitHub</a>.
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
