<script lang="ts">
	export let authors;
	export let lang = 'en';

	$: lang_literals = lang === 'en' ? undefined : 'en';
	$: lang_authors = lang === 'en' ? undefined : lang;

	const parts = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).formatToParts(
		authors
	);
</script>

<span lang={lang_literals}>By</span>
{#each parts as { type, value }}
	{#if type === 'literal'}
		<span lang={lang_literals}>{value}</span>
	{:else}
		<span itemscope itemtype="https://schema.org/Person" lang={lang_authors}>
			<span itemprop="name">{value}</span>
		</span>
	{/if}
{/each}
