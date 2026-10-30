<!--
  @component
  Generates an SVG force simulation using [d3-force](https://github.com/d3/d3-force). The values here are defaults which you will likely have to customize because every force simulation is different. This technique comes from @plmrry.
 -->
<script lang="ts">
	import {
		forceSimulation,
		forceLink,
		forceManyBody,
		forceCollide,
		forceCenter,
		forceX,
		forceY,
		type SimulationLinkDatum,
		type SimulationNodeDatum
	} from 'd3-force';
	import { getLayerCakeContext } from 'layercake';
	import type { Entity } from '#types/network';
	import { links as linksData } from '#utils/data';

	type Node = Entity & SimulationNodeDatum;
	type Edge = SimulationLinkDatum<Node> & { weight: number };
	type Line = { id: string; x1?: number; y1?: number; x2?: number; y2?: number };

	const k = getLayerCakeContext<unknown, Entity[]>();

	// Make a copy because the simulation will alter the objects
	const initialNodes: Node[] = k.data.map((d) => ({ ...d }));
	const initialLinks: Edge[] = linksData.map((d) => ({ ...d }));

	const simulation = forceSimulation(initialNodes);

	let nodes = $state.raw<Node[]>([]);
	let lines = $state.raw<Line[]>([]);

	simulation.on('tick', () => {
		// New objects on every tick so Svelte picks up the changed positions
		nodes = simulation.nodes().map((d) => ({ ...d }));
		lines = initialLinks.map(({ source, target }, i) => {
			const s = source as Node;
			const t = target as Node;
			return { id: `${s.id}-${t.id}-${i}`, x1: s.x, y1: s.y, x2: t.x, y2: t.y };
		});
	});

	function getRadius(d: Node): number {
		return d.type === 'post' ? k.rRange[1] : k.rGet(d);
	}

	// When the chart size changes, set forces and restart the simulation
	$effect(() => {
		simulation
			.force(
				'link',
				forceLink<Node, Edge>(initialLinks).id((d) => d.id)
			)
			.force('charge', forceManyBody())
			.force(
				'collision',
				forceCollide<Node>().radius((d) => getRadius(d) + 4)
			)
			.force('center', forceCenter(k.width / 2, k.height / 2))
			.force('x', forceX())
			.force('y', forceY())
			.alpha(1)
			.restart();
	});

	$effect(() => () => simulation.stop());
</script>

{#each lines as line (line.id)}
	<line
		class="stroke-1 stroke-gray-300 opacity-50"
		x1={line.x1}
		y1={line.y1}
		x2={line.x2}
		y2={line.y2}
	/>
{/each}

{#each nodes as point (point.id)}
	<circle r={getRadius(point)} fill={k.zGet(point)} cx={point.x} cy={point.y}>
		<title>{point.title}</title>
	</circle>
{/each}
