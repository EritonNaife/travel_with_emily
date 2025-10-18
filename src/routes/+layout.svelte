<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/assets/Components/Header.svelte';
	import Footer from '$lib/assets/Components/Footer.svelte';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<div class="">
		<Header />
	</div>

	<!-- Main -->
	<main class="">
		<slot />
	</main>
	<Footer />
</div>
