<script>
	// import { getContext } from 'svelte';
	// const updated_time = getContext('updated_time');
	// import { formatDate } from '$lib/utils.js';
</script>

<footer class="grid grid-cols-2 mb-12 text-sm">
	<time datetime={new Date().toISOString()}>Updated {new Date()}</time>
	<a class="text-sm text-right hover:text-accent" href="https://jonasparnow.com" rel="me"
		>jonasparnow.com</a
	>
</footer>
