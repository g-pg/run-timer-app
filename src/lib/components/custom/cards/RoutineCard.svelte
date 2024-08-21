<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import type { Routine } from '$lib/data/routines/routines';
	import { getRoutineTotalTime } from '$lib/data/routines/utils';
	import { handleInfinity, parseMs } from '$lib/utils/textUtils';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import OptionsIcon from '~icons/material-symbols/more-horiz';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import StorageServices from '$lib/data/db/services';
	import { createEventDispatcher } from 'svelte';

	export let routine: Routine;
	const totalTime = getRoutineTotalTime(routine.laps);

	async function handleDelete() {
		toast.promise(StorageServices.removeRoutine(routine.id), {
			loading: 'Excluindo...',
			success: (v) => {
				dispatch('delete');
				return 'Rotina excluída com sucesso.';
			},
			error: 'Erro ao excluir rotina.'
		});
	}

	const dispatch = createEventDispatcher();
</script>

<a href="/timer/{routine.id}">
	<Card.Root
		class="p-4 grid grid-cols-[1fr_1fr_1fr_1fr_.5fr] items-center place-items-center place-content-center relative"
	>
		<div>
			<p class="text-sm">{routine.name}</p>
		</div>
		<div class="flex flex-col items-center">
			<p>{routine.laps.length}</p>
			<p class="text-xs">Laps</p>
		</div>
		<div class="flex flex-col items-center">
			<p>{handleInfinity(routine.repeat)}</p>
			<p class="text-xs">Loops</p>
		</div>
		<div class="flex flex-col items-center">
			<p>{routine.repeat === Infinity ? handleInfinity(routine.repeat) : parseMs(totalTime)}</p>
			<p class="text-xs">Tempo total</p>
		</div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="w-[30px]">
				<Button size="icon" variant="outline" class="">
					<OptionsIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label class="text-lg">Opções</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item class="text-lg" on:click={() => handleDelete()}
						>Excluir</DropdownMenu.Item
					>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Card.Root>
</a>

<style>
</style>
