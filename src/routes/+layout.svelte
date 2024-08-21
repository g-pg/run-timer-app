<script lang="ts">
	import Navbar from '$lib/components/custom/nav/Navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../styles/globals.css';
</script>

<Toaster />
<Navbar />

<div class="pt-[3.5rem] mx-4 h-[calc(100vh-3rem)]">
	<slot />
</div>
