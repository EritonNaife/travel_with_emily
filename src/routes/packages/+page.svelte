<script lang="ts">
	import PackageCard from '$lib/assets/Components/PackageCard.svelte';
	let { data } = $props();
</script>

<section
	id="Introduction"
	class=" flex h-[60vh] flex-col items-center justify-center gap-5 text-center text-black"
>
	<h2 class="h2">Your Perfect Getaway</h2>
	<p class="md:text-md text-xs">
		Whether you crave sandy beaches, majestic mountains, bustling cities, or serene forests, we
		bring you the best destinations from around the globe. Start your journey here and discover your
		dream getaway.
	</p>
</section>

<section id="Available-packages" class="">
	<div class="grid grid-cols-1 justify-items-center md:grid-cols-2">
		{#each data.packageData as pkgs, id}
			<PackageCard
				title={pkgs.name}
				days={pkgs.days}
				price={pkgs.price}
				imageSrc={pkgs.image_url}
			/>
		{/each}
	</div>
</section>

<section id="Comming-soon" class="flex h-[60vh] items-center justify-center">
	<h2 class="text-center h2 text-black">Coming soon</h2>
	<div class="grid grid-cols-1 md:grid-cols-2"></div>
</section>

<section id="Cta" class="flex h-[40vh] flex-col items-center justify-center">
	<div class="">
		<h2>Let's start a journey</h2>
		<a href="" class="btn">Let's Go</a>
	</div>
</section>
