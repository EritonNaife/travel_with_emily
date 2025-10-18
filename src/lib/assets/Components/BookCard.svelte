<script lang="ts">
	import Icon from '@iconify/svelte';
	export let title: string;
	export let price: number;
	export let show;
</script>

<form
	class="relative mx-auto mt-10 h-[70vh] w-md rounded-lg bg-white px-6 py-4 text-left text-surface-950 shadow-lg"
>
	<div class="mb-4 flex items-center justify-between text-sm">
		<h2 class="font-bold text-primary-600">Book Your Trip</h2>
		<button type="button" on:click={show}
			><Icon icon="material-symbols-light:close" class="size-6" /></button
		>
	</div>
	<h3 class="text-xl font-bold text-primary-600">{title}</h3>
	<p class="mb-5 text-xs text-secondary-800">
		${price} per person
	</p>

	<label class="label mb-4">
		<span class="label-text font-bold text-black text-primary-600">Full Name</span>
		<input
			class="focus:ountline-1 input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-primary-500"
			type="text"
			placeholder="Carla Maria"
		/>
	</label>

	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Email</span>
		<input
			class="focus:ountline-1 input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-primary-500"
			type="email"
			placeholder="Input"
		/>
	</label>

	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Phone Number</span>
		<input
			class="focus:ountline-1 input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-primary-500"
			type="phone"
			placeholder="Input"
		/>
	</label>

	<!-- Date Picker -->
	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Travel Date</span>
		<input
			class="focus:ountline-1 input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-primary-500"
			type="date"
		/>
	</label>

	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Number of Travelers</span>
		<input
			class="focus:ountline-1 input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-primary-500"
			type="number"
			placeholder="Input"
		/>
	</label>

	<button type="button" class="btn w-full preset-filled-primary-500 hover:bg-tertiary-600"
		>Confirm Booking</button
	>
</form>
