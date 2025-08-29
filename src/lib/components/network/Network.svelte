<script lang="ts">
	import entities from '$entities';

	import { LayerCake, Svg } from 'layercake';
	import Layout from './Layout.svg.svelte';
	import { scaleOrdinal, scaleTime, scaleLinear } from 'd3-scale';
	import { schemeCategory10 } from 'd3-scale-chromatic';

	let width = $state(0);
	const size = $derived(scaleLinear().range([6, 12]).domain([300, 1000]).clamp(true));

	const xKey = 'date';
	const rKey = 'weight';
	const zKey = 'type';
</script>

<div class="w-full h-[500px]" bind:clientWidth={width} data-size={size(width)}>
	<LayerCake
		data={entities.map((entity) => ({ ...entity, [xKey]: new Date(entity.date) }))}
		r={rKey}
		z={zKey}
		x={xKey}
		y={xKey}
		xScale={scaleTime()}
		yScale={scaleLinear()}
		yRange={['white', 'steelblue']}
		rRange={[3, size(width)]}
		zScale={scaleOrdinal()}
		zRange={schemeCategory10}
	>
		<Svg>
			<Layout />
		</Svg>
	</LayerCake>
</div>
