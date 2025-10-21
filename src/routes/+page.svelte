<script lang="ts">
	import TourCard from '$lib/assets/Components/TourCard.svelte';
	import { inview } from 'svelte-inview';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import PackageCard from '$lib/assets/Components/PackageCard.svelte';
	import { quartOut, quintOut } from 'svelte/easing';

	let { data } = $props();

	let isPackagesInView = $state(false);
	let isTourInView = $state(false);
	let isCtaInView = $state(false);

	let pkg = data.package;

	const tours = [
		{
			title: 'Private Yacht Cruise',
			description:
				'Sail along the coastline on a luxurious private yacht. Enjoy breathtaking views and personalized service.',
			imageSrc: '/images/tours/boat_tour.png',
			linkHref: '/tours/yacht-cruise'
		},
		{
			title: 'Scenic Helicopter Tour',
			description:
				"Get a bird's-eye view of the city and its surroundings with an exclusive helicopter tour.",
			imageSrc: '/images/tours/heli_tour.png',
			linkHref: '/tours/helicopter-tour'
		}
	];

	const handlePackagesInview = (event: CustomEvent) => {
		isPackagesInView = event.detail.inView as boolean;
	};

	const handleTourInview = (event: CustomEvent) => {
		isTourInView = event.detail.inView as boolean;
	};

	const handleCtaInview = (event: CustomEvent) => {
		isCtaInView = event.detail.inView as boolean;
	};
</script>

<section id="Hero-section">
	<div
		class="relative flex h-screen flex-col justify-center bg-cover bg-center text-center"
		style="background-image: url(/images/hero-section.png);"
		in:fade={{ duration: 1200 }}
	>
		<div class="absolute inset-0 bg-primary-900/40"></div>
		<div class="absolute right-0 bottom-65 left-0 space-y-4 px-8 py-4">
			<div class="overflow-hidden">
				<h1
					class="h1 font-bold text-surface-50 md:text-7xl"
					in:fly={{ y: 100, duration: 800, delay: 500, easing: quartOut }}
				>
					Escape to Paradise
				</h1>
			</div>
			<p
				class="md:text-md mx-auto text-xs font-bold md:w-xl"
				in:fade={{ duration: 800, delay: 800 }}
			>
				Ignite your Wanderlust and unlock a world of possibilities. From serene Beaches to bustling
				Cities, we offer a diverse range of travel packages to suit every taste and budget.
			</p>
			<div class="mt-10 flex justify-center gap-4">
				<a
					href="/"
					class="btn preset-filled-primary-500"
					in:scale={{ start: 1.05, duration: 600, delay: 1000, easing: quartOut }}
				>
					Book a Tour</a
				>
				<a
					href="/test"
					class="btn preset-filled-surface-500"
					in:scale={{ start: 1.05, duration: 600, delay: 1100, easing: quartOut }}>Learn More</a
				>
			</div>
		</div>
	</div>
</section>

<section
	id="Packages-section"
	class="w-full bg-surface-100 bg-white py-10 md:py-16"
	use:inview={{ threshold: 0.2, unobserveOnEnter: true }}
	oninview_change={handlePackagesInview}
>
	{#if isPackagesInView}
		<div class="mx-auto grid w-full max-w-[90vw] grid-cols-1 gap-5 md:grid-cols-2">
			<div
				class="mb-10 text-center md:flex md:items-end md:text-left"
				in:fly={{ x: -50, duration: 1000, easing: quintOut, delay: 1000 }}
			>
				<div class="space-y-5">
					<h2 class="h2 text-surface-900 lg:text-6xl">
						Our Most <br class="hidden md:block" />Coveted <br class="hidden md:block" />Journeys
					</h2>
					<p class="text-surface-700 lg:text-xl">
						Experience the pinnacle of luxury travel with our curated selections. Each journey is a
						masterpiece, crafted for discerning quality and exclusivity
					</p>
				</div>
			</div>

			<div class="container-1">
				<div
					class="h-130 w-full overflow-hidden card rounded-3xl shadow-lg transition-transform md:w-[48vw] md:rotate-5 lg:w-[30vw]"
					in:fly={{ x: 100, duration: 1000, delay: 2000, easing: quintOut }}
				>
					<header class="relative h-full">
						<img src={pkg[0].image_url} alt={pkg[0].name} class="h-full w-full object-cover" />
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
						></div>

						<div class="absolute right-6 bottom-6 left-6 space-y-2 text-white">
							<h3 class="text-2xl font-semibold">{pkg[0].name}</h3>
							<p class="text-sm opacity-90">{pkg[0].days} days</p>
							<p class="text-sm">
								From <span class="font-bold">${pkg[0].price}</span> / person
							</p>

							<div class="flex justify-center">
								<button
									class="mt-3 inline-block rounded-xl border border-surface-100/50 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-surface-50/10"
								>
									Explore Package
								</button>
							</div>
						</div>
					</header>
				</div>
			</div>

			<div class="container-2 flex justify-end">
				<div
					class="relative h-130 w-full overflow-hidden card rounded-3xl shadow-lg transition-transform md:left-80 md:w-[48vw] md:rotate-5 lg:w-[30vw]"
					in:fly={{ x: 100, duration: 1000, delay: 2500, easing: quintOut }}
				>
					<header class="relative h-full">
						<img src={pkg[1].image_url} alt={pkg[1].name} class="h-full w-full object-cover" />
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
						></div>

						<div class="absolute right-6 bottom-6 left-6 space-y-2 text-white">
							<h3 class="text-2xl font-semibold">{pkg[1].name}</h3>
							<p class="text-sm opacity-90">{pkg[1].days} days</p>
							<p class="text-sm">
								From <span class="font-bold">${pkg[1].price}</span> / person
							</p>

							<div class="flex justify-center">
								<button
									class="mt-3 inline-block rounded-xl border border-surface-100/50 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-surface-50/10"
								>
									Explore Package
								</button>
							</div>
						</div>
					</header>
				</div>
			</div>
		</div>
	{/if}
</section>

<section
	id="Tour-section"
	class="overflow-x-hidden bg-surface-200 py-10"
	use:inview={{ threshold: 0, unobserveOnEnter: true }}
	oninview_change={handleTourInview}
>
	{#if isTourInView}
		<div
			class="mx-auto flex min-h-[80vh] max-w-[90vw] flex-col gap-5 py-10 text-center lg:w-[80vw]"
		>
			<div class="overflow-hidden">
				<h2 class="h2 text-surface-900" in:fly={{ y: 50, duration: 800, delay: 200 }}>
					Exclusive Experiences
				</h2>
			</div>
			<div class="overflow-hidden">
				<p class="text-surface-700" in:fly={{ y: 50, duration: 800, delay: 400 }}>
					Elevate your journey with our premium private experiences
				</p>
			</div>

			<div
				class="mt-8 flex flex-col gap-10 md:flex-row md:gap-10 lg:justify-center"
				in:fly={{
					y: 100,
					duration: 800,
					delay: 800,
					easing: quartOut
				}}
			>
				{#each tours as tour, i}
					<div class="">
						<TourCard
							title={tour.title}
							description={tour.description}
							imageSrc={tour.imageSrc}
							linkHref={tour.linkHref}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>

<section
	id="cta-section"
	class="flex min-h-[70vh] items-center justify-center bg-surface-100 px-6 py-10"
	use:inview={{ threshold: 0.4, unobserveOnEnter: true }}
	oninview_change={handleCtaInview}
>
	{#if isCtaInView}
		<div
			class="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-cover bg-center text-center shadow-2xl md:h-[50vh]"
			in:fly={{ y: 100, duration: 1000, delay: 200, easing: quartOut }}
		>
			<div
				class="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-in-out hover:scale-110"
				style="background-image: url(/images/cta.png);"
			></div>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
			></div>
			<div
				class="relative z-10 flex flex-col items-center space-y-6 p-8 text-surface-50 sm:p-12 md:top-20 lg:p-16"
			>
				<h2 class="h2" in:fly={{ y: 100, duration: 1000, delay: 800, easing: quartOut }}>
					Are You Ready to Travel
				</h2>
				<p in:fly={{ y: 100, duration: 1000, delay: 1600, easing: quartOut }}>
					Don't wait any longer. Start planning your trip today. Contact us to discuss your travel
					needs and let us handle the details
				</p>
				<a
					in:fly={{ y: 100, duration: 1000, delay: 3200, easing: quartOut }}
					href="/"
					class="btn preset-filled-primary-500 text-surface-50">Join Us</a
				>
			</div>
		</div>
	{/if}
</section>

<style>
	@keyframes pulse-slow {
		0%,
		100% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7);
		}
		50% {
			transform: scale(1.05);
			box-shadow: 0 0 10px 10px rgba(255, 107, 53, 0);
		}
	}
	.animate-pulse-slow {
		animation: pulse-slow 5s infinite;
	}
</style>
