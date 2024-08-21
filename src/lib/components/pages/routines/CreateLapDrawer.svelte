<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { Lap } from '$lib/data/routines/routines';
	import { minutesToMs, secondsToMs } from '$lib/utils/timeUtils';
	import { createEventDispatcher } from 'svelte';

	export let open = true;

	let formData = {
		name: '',
		minutes: undefined,
		seconds: undefined
	};

	//Helpers
	const dispatch = createEventDispatcher();

	function validateData() {
		return formData.name !== '';
	}

	function sendLap() {
		validateData();
		const lap: Lap = {
			name: formData.name,
			time: minutesToMs(formData.minutes || 0) + secondsToMs(formData.seconds || 0)
		};
		dispatch('createLap', lap);
		open = false;
	}
</script>

<Drawer.Root bind:open>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Criar intervalo</Drawer.Title>
		</Drawer.Header>

		<form on:submit|preventDefault={sendLap} data-vaul-no-drag>
			<div class="px-4 space-y-4">
				<Input
					id="name"
					required
					bind:value={formData.name}
					type="text"
					placeholder="Nome do intervalo"
				/>
				<div class="flex items-center gap-2">
					<Input
						variant="underline"
						id="minutes"
						bind:value={formData.minutes}
						type="number"
						max="59"
						min="0"
						placeholder="Minutos"
					/>
					<Input
						variant="underline"
						id="minutes"
						max="59"
						min="0"
						bind:value={formData.seconds}
						type="number"
						placeholder="Segundos"
					/>
				</div>
			</div>

			<Drawer.Footer>
				<Button type="submit">Adicionar</Button>
				<Drawer.Close>Cancelar</Drawer.Close>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>

<style>
</style>
