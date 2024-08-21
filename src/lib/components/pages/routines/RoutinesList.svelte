<script lang="ts">
	import RoutineCard from '$lib/components/custom/cards/RoutineCard.svelte';
	import StorageServices from '$lib/data/db/services';
	import type { Routine } from '$lib/data/routines/routines';
	import { tick } from 'svelte';

	let listPromise = getRoutines();

	async function getRoutines() {
		const r = await StorageServices.getRoutines();
		console.log(r);
		return r;
	}
</script>

<div class="space-y-3">
	<div>
		<div class="grid gap-2">
			{#await listPromise then routines}
				{#each routines as routine, i (routine.id)}
					<RoutineCard {routine} on:delete={() => (listPromise = getRoutines())} />
				{/each}
			{:catch error}
				<p>{error}</p>
			{/await}
		</div>
	</div>
</div>

<style>
</style>
