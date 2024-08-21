<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { parseMs } from '$lib/utils/textUtils';

	export let title = '';
	export let time = 0;
</script>

<Card.Root class="p-6 flex justify-between items-center">
	<Card.Title>{title}</Card.Title>
	<span class="font-bold text-xl">{parseMs(time)}</span>
</Card.Root>

<style>
</style>
