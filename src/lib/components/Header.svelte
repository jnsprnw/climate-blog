<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import type { IsModeLight } from '$types/ui';
	import { getPageDescription } from '$utils/posts';
	import { getAbsoluteURL } from '$utils/url';
	import ThemeSwitch from './ThemeSwitch.svelte';

	const isModeLight = getContext<IsModeLight>('isModeLight');
</script>

<header
	class="mb-8 pb-8 sm:mb-12 md:mb-16 border-b-2 border-dark dark:border-[#99999A] sm:pb-12 md:pb-16 flex gap-y-4 flex-col sm:flex-row justify-between"
>
	<div>
		<a
			href={getAbsoluteURL('/', isModeLight)}
			aria-current={page.data?.path === '' ? 'page' : undefined}
			class="hover:text-accent transition-colors"
		>
			<h1 class="text-3xl leading-none md:text-4xl font-semibold md:leading-9">
				Artefacts of a<br /> Burning World
			</h1>
		</a>
		<p class="mt-3 max-w-xs font-serif italic leading-5">
			{getPageDescription()}
		</p>
	</div>
	<div class="grid grid-rows-[auto_auto] gap-y-2 justify-items-end">
		<ThemeSwitch />
		{#if page.data?.path === 'about'}
			<a
				class="link sm:place-self-end text-sm"
				aria-current={page.data?.path === '' ? 'page' : undefined}
				href={getAbsoluteURL('/', isModeLight)}
			>
				Back to the collection
			</a>
		{:else}
			<a
				class="link sm:place-self-end text-sm"
				aria-current={page.data?.path === 'about' ? 'page' : undefined}
				href={getAbsoluteURL('about', isModeLight)}
			>
				About this blog
			</a>
		{/if}
	</div>
</header>
