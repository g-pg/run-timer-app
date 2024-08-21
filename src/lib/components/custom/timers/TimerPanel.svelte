<script lang="ts">
	export let time: string = '';
	export let title = '';
</script>

<div class="flex flex-col {$$props.class}">
	<span class="text-[4rem] font-bold">{time}</span>
	{#if title}
		<p class="text-base text-center -mt-2">{title}</p>
	{/if}
</div>
