<script lang="ts">
	import entities from '$entities';

	import { LayerCake, Svg } from 'layercake';
	import Layout from './Layout.svg.svelte';
	import { scaleOrdinal } from 'd3-scale';
	import { schemeCategory10 } from 'd3-scale-chromatic';

	const rKey = 'weight';
	const zKey = 'type';
</script>

<div class="w-full h-96">
	<LayerCake
		data={entities}
		r={rKey}
		z={zKey}
		rRange={[3, 12]}
		zScale={scaleOrdinal()}
		zRange={schemeCategory10}
	>
		<Svg>
			<Layout />
		</Svg>
	</LayerCake>
</div>
