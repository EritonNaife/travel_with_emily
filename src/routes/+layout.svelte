<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/assets/Components/Header.svelte';
	import Footer from '$lib/assets/Components/Footer.svelte';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="grid h-screen grid-rows-[auto_1fr_auto]" transition:fade={{ duration: 1000 }}>
	<div class="">
		<Header />
	</div>

	<!-- Main -->
	<main class="bg-surface-600">
		<slot />
	</main>
	<Footer />
</div>
