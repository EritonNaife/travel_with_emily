<script lang="ts">
	import TourCard from '$lib/assets/Components/TourCard.svelte';
	import BookCard from '$lib/assets/Components/BookCard.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { scale } from 'svelte/transition';
	import PackageCard from '$lib/assets/Components/PackageCard.svelte';

	const destinations = [
		{
			title: 'Luxury in Dubai',
			description:
				'Experience the opulence of Dubai with its stunning skyscrapers, luxury shopping, and desert safaris.',
			imageSrc: '/images/packages/Burj Al Arab.png',
			linkHref: '/packages/dubai',
			days: 6,
			price: 2250
		},
		{
			title: 'Ancient Egypt Explorer',
			description:
				'Journey through time and discover the ancient wonders of Egypt, from the pyramids of Giza to the temples of Luxor.',
			imageSrc: 'https://www.almadeviajante.com/wp-content/uploads/piramides-gize-egito.jpg',
			linkHref: '/packages/egypt',
			days: 7,
			price: 1850
		}
	];

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
</script>

<section id="Hero-section" class="relative h-screen overflow-hidden">
	<!-- Background Video -->
	<video
		class="absolute top-0 left-0 -z-10 h-full w-full object-cover"
		src="/vids/hero-vid.mp4"
		autoplay
		muted
		loop
		playsinline
	></video>

	<!-- Overlay -->
	<div class="absolute inset-0 z-0 bg-primary-900/30"></div>

	<!-- Hero Content -->
	<div class="relative z-10 flex h-screen flex-col justify-center space-y-4 px-8 py-4 text-center">
		<h1 class="h1 font-bold text-surface-50 md:text-7xl">Escape to Paradise</h1>

		<p class="md:text-md mx-auto text-xs font-bold md:w-xl">
			Ignite your Wanderlust and unlock a world of possibilities. From serene Beaches to bustling
			Cities, we offer a diverse range of travel packages to suit every taste and budget.
		</p>

		<div class="mt-10 flex justify-center gap-4">
			<a href="#" class="btn preset-filled-primary-500">Book a Tour</a>
			<a href="#" class="btn preset-filled-surface-500">Learn More</a>
		</div>
	</div>
</section>

<section id="Packages-section" class="w-full bg-surface-100 bg-white py-10 md:py-16">
	<div class="mx-auto grid w-full max-w-[90vw] grid-cols-1 gap-5 md:grid-cols-2">
		<div class="mb-10 text-center md:flex md:items-end md:text-left">
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

		{#each destinations as destination, i}
			<div
				class="mb-4 flex justify-center"
				class:md:col-span-2={i === 1}
				class:container-1={i === 0}
				class:container-2={i === 1}
			>
				<PackageCard
					title={destination.title}
					description={destination.description}
					imageSrc={destination.imageSrc}
					linkHref={destination.linkHref}
					days={destination.days}
					price={destination.price}
				/>
			</div>
		{/each}
	</div>
</section>

<section id="Tour-section" class="bg-surface-200 py-10">
	<div class="mx-auto flex min-h-[80vh] max-w-[90vw] flex-col gap-5 py-10 text-center lg:w-[80vw]">
		<h2 class="h2 text-surface-900">Exclusive Experiences</h2>
		<p class="text-surface-700">Elevate your journey with our premium private experiences</p>

		<div class="flex flex-col gap-10 md:flex-row md:gap-10 lg:justify-center">
			{#each tours as tour}
				<TourCard
					title={tour.title}
					description={tour.description}
					imageSrc={tour.imageSrc}
					linkHref={tour.linkHref}
				/>
			{/each}
		</div>
	</div>
</section>

<section
	id="cta-section"
	class="flex min-h-[70vh] items-center justify-center bg-surface-100 px-6 py-10"
>
	<div
		class="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-cover bg-center text-center shadow-2xl md:h-[50vh]"
		style="background-image: url(/images/cta.png);"
	>
		<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
		<div
			class="relative z-10 flex flex-col items-center space-y-6 p-8 text-surface-50 sm:p-12 md:top-20 lg:p-16"
		>
			<h2 class="h2">Are You Ready to Travel</h2>
			<p>
				Don't wait any longer. Start planning your trip today. Contact us to discuss your travel
				needs and let us handle the details
			</p>
			<a href="" class="btn preset-filled-primary-500 text-surface-50">Join Us</a>
		</div>
	</div>
</section>
