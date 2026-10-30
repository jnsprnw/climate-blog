<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import { scaleOrdinal, scaleLinear } from 'd3-scale';
	import { schemeCategory10 } from 'd3-scale-chromatic';
	import { entities } from '#utils/data';
	import Layout from './Layout.svg.svelte';

	let width = $state(0);
	const size = scaleLinear().range([6, 12]).domain([300, 1000]).clamp(true);
</script>

<div class="w-full h-[500px]" bind:clientWidth={width}>
	<LayerCake
		data={entities}
		r="weight"
		z="type"
		rRange={[3, size(width)]}
		zScale={scaleOrdinal()}
		zRange={[...schemeCategory10]}
	>
		<Svg>
			<Layout />
		</Svg>
	</LayerCake>
</div>
