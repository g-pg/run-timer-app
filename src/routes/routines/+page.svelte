<script lang="ts">
	import CreateRoutine from '$lib/components/pages/routines/CreateRoutine.svelte';
	import RoutinesList from '$lib/components/pages/routines/RoutinesList.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index';

	//Tabs
	const tabs = ['routines', 'create'] as const;

	//States
	let currentTab: (typeof tabs)[number] = 'routines';
	function handleNewRoutine() {
		currentTab = 'routines';
	}
</script>

<Tabs.Root bind:value={currentTab} class="w-full">
	<Tabs.List class="w-full grid-cols-2 grid">
		<Tabs.Trigger value="routines">Rotinas</Tabs.Trigger>
		<Tabs.Trigger value="create">Criar rotina</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="routines" class="pt-4">
		{#key currentTab}
			<RoutinesList />
		{/key}
	</Tabs.Content>
	<Tabs.Content value="create" class="pt-4">
		<CreateRoutine
			on:createRoutine={() => {
				handleNewRoutine();
			}}
		/>
	</Tabs.Content>
</Tabs.Root>

<style>
</style>
