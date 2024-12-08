<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.error}
		{#if $page.status === 404}
			<h1 class="mb-4 text-3xl leading-tight md:text-4xl lg:text-5xl text-balance" itemprop="name">
				The page was not found
			</h1>
			<span>Sorry, the page you are looking for does not exist.</span><br />
			<a href="/" class="link">Go back to the homepage</a>
		{:else}
			<h1 class="mb-4 text-3xl leading-tight md:text-4xl lg:text-5xl text-balance" itemprop="name">
				{$page.status}: {$page.error.message}
			</h1>
		{/if}
	{:else}
		<h1>Something went wrong</h1>
	{/if}
</div>
