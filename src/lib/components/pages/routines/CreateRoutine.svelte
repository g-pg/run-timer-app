<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Routine } from '$lib/data/routines/routines';
	import { nanoid } from 'nanoid';
	import CreateRoutineDrawer from './CreateLapDrawer.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import StorageServices from '$lib/data/db/services';
	import { createEventDispatcher } from 'svelte';
	import { toast } from 'svelte-sonner';
	import IncomingLap from '$lib/components/custom/cards/LapCard.svelte';

	//States
	let isLapDrawerOpen = false;

	//Form data
	let formData: Routine = {
		id: '0',
		name: '',
		laps: [],
		repeat: 0
	};

	//Helpers
	function validateData() {
		return formData.name !== '' && formData.laps.length > 0 && !Number.isNaN(formData.repeat);
	}
	//Handlers
	async function handleCreateRoutine() {
		if (!validateData()) {
			toast.error('Preencha todos os campos corretamente');
			return;
		}
		formData.id = nanoid();
		toast.promise(StorageServices.addRoutine(formData), {
			loading: 'Criando rotina...',
			success: () => {
				dispatch('createRoutine');
				return 'Rotina criada com sucesso!';
			},
			error: 'Erro ao criar rotina'
		});
	}

	//Helpers
	const dispatch = createEventDispatcher();
</script>

<form class="space-y-8" on:submit|preventDefault={handleCreateRoutine}>
	<div class="space-y-2">
		<Label for="name">Nome da rotina</Label>
		<Input id="name" bind:value={formData.name} type="text" placeholder="Digite o nome" />
	</div>
	<div class="flex flex-col gap-2">
		<Label for="repeat">Intervalos</Label>
		<Button variant="outline" on:click={() => (isLapDrawerOpen = true)}>Criar intervalo</Button>
		{#key formData.laps}
			{#each formData.laps as lap, i}
				<IncomingLap title={lap.name} time={lap.time} />
			{/each}
		{/key}
	</div>
	<div class="grid grid-cols-[1fr_1fr_auto] items-center">
		<Label for="repeat">Repetir intervalos</Label>
		<Input
			id="repeat"
			bind:value={formData.repeat}
			type="number"
			min="0"
			variant="underline"
			placeholder="&infin;"
		/>
		<div class="flex items-center gap-2">
			<Checkbox
				id="repeat"
				checked={formData.repeat === Infinity}
				onCheckedChange={(v) => (formData.repeat = v ? Infinity : 0)}
			/>
			<Label for="repeat" class="text-2xl">&infin;</Label>
		</div>
	</div>
	<Button class="w-full" type="submit" on:click={() => console.log(formData)}>Criar rotina</Button>
</form>

{#key isLapDrawerOpen}
	<CreateRoutineDrawer
		bind:open={isLapDrawerOpen}
		on:createLap={(e) => {
			formData.laps = [...formData.laps, e.detail];
			console.log(formData);
		}}
	/>
{/key}

<style>
</style>
