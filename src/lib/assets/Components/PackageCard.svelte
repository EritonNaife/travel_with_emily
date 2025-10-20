<script lang="ts">
	import { browser } from '$app/environment';
	import BookCard from '$lib/assets/Components/BookCard.svelte';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	export let imageSrc: string;
	export let title: string;

	export let days: number;
	export let price: number;

	let showBookCard: boolean = false;

	function toggleBookCard() {
		showBookCard = !showBookCard;
	}

	$: if (browser) {
		if (showBookCard) {
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
	class="h-130 w-full overflow-hidden card rounded-3xl shadow-lg transition-transform md:w-[48vw] md:rotate-5 lg:w-[30vw]"
	in:fly={{ y: 50, duration: 800, delay: 6000, easing: quintOut }}
>
	<header class="relative h-full">
		<img src={imageSrc} alt={title} class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

		<div class="absolute right-6 bottom-6 left-6 space-y-2 text-white">
			<h3 class="text-2xl font-semibold">{title}</h3>
			<p class="text-sm opacity-90">{days} days</p>
			<p class="text-sm">
				From <span class="font-bold">${price}</span> / person
			</p>

			<div class="flex justify-center">
				<button
					on:click={toggleBookCard}
					class="mt-3 inline-block rounded-xl border border-surface-100/50 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-surface-50/10"
				>
					Explore Package
				</button>
			</div>
		</div>
	</header>
</div>

{#if showBookCard}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<div class="absolute inset-0 bg-black/40" on:click={toggleBookCard}></div>
		<div class="" in:scale={{ duration: 600, delay: 100 }} out:scale={{ duration: 500 }}>
			<BookCard {title} {price} show={toggleBookCard} />
		</div>
	</div>
{/if}
