<script lang="ts">
	import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';
	import Icon from '@iconify/svelte';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Packages', href: '/packages' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<AppBar
	class="absolute top-10 right-0 left-0 z-10 mx-auto w-full max-w-[90vw] rounded-full bg-surface-50 lg:w-[80vw]"
>
	<AppBar.Toolbar class="flex items-center justify-between md:px-4">
		<AppBar.Headline>
			<a href="" class="h4 text-primary-500">TravelWithEmily</a>
		</AppBar.Headline>

		<AppBar.Lead>
			<nav class="hidden h4 xl:flex">
				{#each links as link}
					<a
						href={link.href}
						class="btn text-primary-900/70 hover:font-bold hover:text-tertiary-400">{link.name}</a
					>
				{/each}
			</nav>
		</AppBar.Lead>

		<AppBar.Trail>
			<a href="" class="btn hidden rounded-full preset-filled-primary-500 p-4 xl:flex"
				>Get in touch</a
			>
			<button class=" btn flex h4 text-primary-500 xl:hidden"
				><Icon icon="iconamoon:menu-burger-horizontal-bold" /></button
			>
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
