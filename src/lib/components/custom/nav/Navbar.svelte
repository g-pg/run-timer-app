<script lang="ts">
	import BurgerIcon from '~icons/material-symbols/menu-rounded';
	import Button from '../../ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	let open = false;
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger class="fixed top-2 left-2">
		<BurgerIcon class="text-[30px]" />
	</Sheet.Trigger>
	<Sheet.Content side="left">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<nav class="flex flex-col gap-4 text-xl font-bold pt-8" on:click={() => (open = false)}>
			<a href="/routines">Rotinas</a>
			<a href="/">Iniciar rotina</a>
		</nav>
	</Sheet.Content>
</Sheet.Root>
