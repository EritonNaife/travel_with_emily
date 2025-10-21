<script lang="ts">
	let { data } = $props();
	import PackageCard from '$lib/assets/Components/PackageCard.svelte';
</script>

<div class="flex h-screen items-center justify-center bg-primary-500 text-surface-900">
	<ul>
		{#each data.package as packages}
			<li>{packages.name}</li>
		{/each}
	</ul>
</div>
