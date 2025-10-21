<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';

	let { title, tour_id, show, form } = $props();

	let isSubmitting = $state(false);
	let showSuccessModal = $state(false);
	let lastSubmittedTourId = $state<number | null>(null);

	// Watch for successful submission for THIS specific tour
	$effect(() => {
		if (form?.success && lastSubmittedTourId === tour_id) {
			showSuccessModal = true;
			// Auto close after 2 seconds
			setTimeout(() => {
				showSuccessModal = false;
				lastSubmittedTourId = null;
				show(); // Close the inquiry form
			}, 2000);
		}
	});

	function closeSuccessModal() {
		showSuccessModal = false;
		show(); // Also close the inquiry form
	}
</script>

<form
	method="POST"
	action="?/inquiry"
	use:enhance={() => {
		isSubmitting = true;
		lastSubmittedTourId = tour_id; // Track which tour was submitted

		return async ({ result, update }) => {
			isSubmitting = false;
			await update();
		};
	}}
	class="relative mx-auto mt-10 w-full max-w-md rounded-lg bg-white px-6 py-4 text-left text-surface-950 shadow-lg"
>
	<input type="hidden" name="tour_id" value={tour_id} />
	<div class="mb-4 flex items-center justify-between text-sm">
		<h2 class="font-bold text-primary-600">Request Information</h2>
		<button type="button" onclick={show}>
			<Icon icon="material-symbols-light:close" class="size-6" />
		</button>
	</div>
	<h3 class="text-xl font-bold text-primary-600">{title}</h3>
	<p class="mb-5 text-xs text-secondary-800">
		Fill out the form and we'll get back to you as soon as possible!
	</p>

	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Full Name</span>
		<input
			name="fullName"
			class="input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-1 focus:outline-primary-500"
			type="text"
			placeholder="Carla Maria"
			required
			disabled={isSubmitting}
		/>
	</label>

	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Email</span>
		<input
			name="mail"
			class="input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-1 focus:outline-primary-500"
			type="email"
			placeholder="mail@email.com"
			required
			disabled={isSubmitting}
		/>
	</label>

	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Phone Number</span>
		<input
			name="phoneNumber"
			class="input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-1 focus:outline-primary-500"
			type="tel"
			placeholder="+351912345678"
			required
			disabled={isSubmitting}
		/>
	</label>

	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Preferred Date</span>
		<input
			name="date"
			class="input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-1 focus:outline-primary-500"
			type="date"
			required
			disabled={isSubmitting}
		/>
	</label>

	<label class="label mb-4">
		<span class="label-text font-bold text-primary-600">Message</span>
		<textarea
			required
			name="message"
			class="input rounded-xl border-secondary-400 text-primary-900 placeholder:text-sm placeholder:text-secondary-800 focus:outline-1 focus:outline-primary-500"
			rows="5"
			placeholder="Tell us more about your inquiry..."
			disabled={isSubmitting}
		></textarea>
	</label>

	{#if form?.error}
		<p class="mb-4 text-sm text-red-600">❌ {form.error}</p>
	{/if}

	<button
		type="submit"
		class="btn w-full preset-filled-primary-500 hover:bg-tertiary-600 disabled:opacity-50"
		disabled={isSubmitting}
	>
		{isSubmitting ? 'Submitting...' : 'Submit'}
	</button>
</form>

<!-- Success Modal -->
{#if showSuccessModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
		onclick={closeSuccessModal}
		onkeydown={(e) => e.key === 'Escape' && closeSuccessModal()}
		role="button"
		tabindex="0"
	>
		<div
			class="animate-fade-in relative mx-4 w-full max-w-sm rounded-2xl bg-white px-8 py-10 text-center shadow-2xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
		>
			<div class="mb-4 flex justify-center">
				<div class="rounded-full bg-green-100 p-3">
					<Icon icon="mdi:check-circle" class="size-16 text-green-600" />
				</div>
			</div>
			<h3 class="mb-2 text-2xl font-bold text-gray-900">Success!</h3>
			<p class="mb-6 text-gray-600">Inquiry submitted successfully.</p>
			<p class="text-sm text-gray-500">We'll get back to you soon!</p>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}
</style>
