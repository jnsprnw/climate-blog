<script lang="ts">
	import { getPageDescription } from '$utils/posts';
	import { getContext } from 'svelte';
	import { getAbsoluteURL } from '$utils/url';
	import type { IsModeLight } from '$types/ui';

	const isModeLight = getContext<IsModeLight>('isModeLight');
</script>

<header
	class="mb-8 pb-8 sm:mb-12 md:mb-16 border-b-2 border-dark dark:border-[#99999A] sm:pb-12 md:pb-16"
>
	<a href={getAbsoluteURL('/', isModeLight)} class="hover:text-accent transition-colors">
		<h1 class="text-3xl leading-none md:text-4xl font-semibold md:leading-9">
			Artefacts of a<br /> Burning World
		</h1>
	</a>
	<p class="mt-3 max-w-xs font-serif italic leading-5">
		{getPageDescription()}
	</p>
</header>
