<script lang="ts">
	import InquiryCard from '$lib/assets/Components/InquiryCard.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	export let title: string;
	export let description: string;
	export let imageSrc: string;
	export let linkHref: string;
	import { fly, scale } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';

	let showInquiryCard: boolean = false;

	function toggleInquiryCard() {
		showInquiryCard = !showInquiryCard;
	}

	// Use reactive statement with browser check
	$: if (browser) {
		if (showInquiryCard) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}

	// Clean up on component destruction
	onMount(() => {
		return () => {
			if (browser) {
				document.body.classList.remove('overflow-hidden');
			}
		};
	});
</script>

<div
	in:fly={{
		y: 100,
		duration: 800,
		delay: 600,
		easing: quartOut
	}}
	class="group block max-w-md overflow-hidden rounded-xl bg-surface-50 shadow-lg shadow-primary-500/10 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl"
>
	<header class="relative overflow-hidden">
		<img
			src={imageSrc}
			alt={title}
			class="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
			loading="lazy"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
		<h3
			class="absolute bottom-0 left-0 p-4 text-2xl font-bold tracking-tight text-surface-50 transition-colors duration-300 ease-in-out group-hover:text-surface-50"
		>
			{title}
		</h3>
	</header>

	<article class="px-4 py-6 text-left">
		<p class="leading-relaxed text-primary-900/80">{description}</p>
	</article>

	<footer class="px-4 py-4">
		<button
			on:click={toggleInquiryCard}
			class="inline-block w-full rounded-lg border border-tertiary-500 bg-transparent px-5 py-3 text-center font-semibold text-tertiary-600 transition-colors duration-300 hover:bg-tertiary-500 hover:text-surface-50"
		>
			Request Inquiry
		</button>
	</footer>
</div>

{#if showInquiryCard}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<!-- Overlay -->
		<div class="absolute inset-0 bg-black/20" on:click={toggleInquiryCard}></div>

		<!-- Modal Content -->
		<div class="" in:scale={{ duration: 600, delay: 100 }} out:scale={{ duration: 500 }}>
			<InquiryCard {title} show={toggleInquiryCard} />
		</div>
	</div>
{/if}
