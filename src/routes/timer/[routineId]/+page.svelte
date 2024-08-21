<script lang="ts">
	import { parseMs } from '$lib/utils/textUtils';
	import IncomingLap from '$lib/components/custom/cards/LapCard.svelte';
	import TimerPanel from '$lib/components/custom/timers/TimerPanel.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { type Lap } from '$lib/data/routines/routines';
	import Timer from '$lib/data/timers/Timer';
	import { Haptics } from '@capacitor/haptics';
	import { onDestroy } from 'svelte';
	import PauseIcon from '~icons/material-symbols/pause-rounded';
	import PlayIcon from '~icons/material-symbols/play-arrow-rounded';
	import RepeatIcon from '~icons/material-symbols/repeat-rounded';

	import { speak } from '$lib/android/apis/screenReader.js';

	export let data;
	let routine = data.routine!;
	let timer = new Timer(routine);

	let interval: any;

	function startTimer() {
		if (timer.isEnded) {
			return;
		}

		timer.start();
		timer = timer;
		interval = setInterval(() => {
			timer = timer;
			handleNextLapWarning();
		}, 1000);
	}

	function pauseTimer() {
		clearInterval(interval);
		timer.pause();
		timer = timer;
	}

	let previousLapIndex = timer.currentLapIndex;

	$: if (timer.currentLapIndex !== previousLapIndex) {
		previousLapIndex = timer.currentLapIndex;
		Haptics.vibrate({
			duration: 500
		});
	}

	onDestroy(() => {
		pauseTimer();
	});

	//Helpers
	let nextLap: Lap | null = null;
	function getNextLap(p: number) {
		warnedAboutNextLap = false;
		let nextLapIndex = timer.currentLapIndex + 1;
		if (timer.currentLoop <= timer.routine.repeat) {
			nextLapIndex = nextLapIndex % timer.routine.laps.length;
		}

		if (nextLapIndex >= timer.routine.laps.length) {
			return null;
		}

		return timer.routine.laps[nextLapIndex];
	}

	$: nextLap = getNextLap(previousLapIndex);

	let warnedAboutNextLap = false;
	async function handleNextLapWarning() {
		if (!nextLap || warnedAboutNextLap) {
			return;
		}

		const remainingLapTime = timer.currentLap.time - timer.elapsedLapTime;

		if (remainingLapTime <= 10_000) {
			warnedAboutNextLap = true;
			await speak(`Em ${remainingLapTime / 1000} segundos, ${nextLap.name}.`);
		}
	}
</script>

<h2 class="text-center text-3xl">{routine.name}</h2>
<div class="flex flex-col gap-4 h-full">
	{#key timer.elapsedTotalTime}
		<TimerPanel time={timer.elapsedTotalTime} title="Tempo total" class="mx-auto" />
	{/key}

	<Separator />
	<p class="text-2xl text-center font-bold text-primary h-8 -mb-6">
		{timer.currentLap?.name || ''}
	</p>
	<TimerPanel time={parseMs(timer.elapsedLapTime)} title="Tempo atual" class="mx-auto" />

	<div class="mt-4">
		<div class="flex justify-between items-center mb-4">
			<p class="font-medium text-xl">Próximo</p>
			<p class="font-medium text-xl flex items-center gap-2">
				<RepeatIcon />
				{timer.currentLoop} / {timer.totalLoops === Infinity ? '∞' : timer.totalLoops + 1}
			</p>
		</div>
		{#if nextLap}
			<IncomingLap title={nextLap?.name} time={nextLap?.time} />
		{:else}
			<Card class="p-6">
				<p class="text-primary/50 font-bold text-center text-xl">Fim da rotina</p>
			</Card>
		{/if}
	</div>

	<div class="mt-auto grid grid-cols-1 gap-4">
		{#if timer.state === 'running'}
			<Button class="p-8" variant="destructive" size="lg" on:click={() => pauseTimer()}>
				<PauseIcon class="text-3xl" />
				Pause
			</Button>
		{:else if timer.state === 'paused'}
			<Button class="p-8" size="lg" on:click={() => startTimer()}>
				<PlayIcon class="text-3xl" />
				{timer.isStarted ? 'Continuar' : 'Começar'}
			</Button>
		{/if}
	</div>
</div>
