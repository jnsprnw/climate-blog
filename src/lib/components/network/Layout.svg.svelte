<!--
  @component
  Generates an SVG force simulation using [d3-force](https://github.com/d3/d3-force). The values here are defaults which you will likely have to customize because every force simulation is different. This technique comes from @plmrry.
 -->
<script lang="ts">
	import { getContext } from 'svelte';
	import {
		forceSimulation,
		forceLink,
		forceManyBody,
		forceCollide,
		forceCenter,
		forceX,
		forceY
	} from 'd3-force';
	import type { Entity, Link } from '$types/network';
	import linksRaw from '$links';
	import { scaleOrdinal, scaleTime, scaleLinear } from 'd3-scale';
	

	const { data, width, height, rGet, zGet, rRange, xScale, xGet, xRange, xDomain, yGet } =
		getContext('LayerCake');
	
	

	/* --------------------------------------------
	 * Make a copy because the simulation will alter the objects
	 */
	const initialNodes = $data.map((d: Entity) => ({ ...d }));
	const initialLinks = linksRaw.map((d: Link) => ({ ...d }));

	const simulation = forceSimulation(initialNodes);

	let nodes = $state([]);
	let links = $state([]);

	simulation.on('tick', () => {
		nodes = simulation.nodes();
		links = initialLinks;
	});

	function getRadius(d: Entity) {
		if (d.type === 'post') {
			return $rRange[1];
		}
		return $rGet(d);
	}

	/* ----------------------------------------------
	 * When variables change, set forces and restart the simulation
	 */
	$effect(() => {
		simulation
			.force(
				'link',
				forceLink(initialLinks).id((d) => d.id)
			)
			.force('charge', forceManyBody())
			.force(
				'collision',
				forceCollide().radius((d) => getRadius(d) + 4)
			)
			.force('center', forceCenter($width / 2, $height / 2))
			.force('x', forceX())
			.force('y', forceY())
			.alpha(1)
			.restart();
	});
</script>

{#each links as link}
	<line
		class="stroke-1 stroke-gray-300 opacity-50"
		x1={link.source.x}
		y1={link.source.y}
		x2={link.target.x}
		y2={link.target.y}
	/>
{/each}

{#each nodes as point}
	<circle r={getRadius(point)} fill={$zGet(point)} cx={point.x} cy={point.y}>
		<title>{point.title}</title>
	</circle>
{/each}
