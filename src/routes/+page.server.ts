// src/routes/.../+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const [tourRes, packagesRes] = await Promise.all([
		supabase.from('tours').select('*'),
		supabase.from('packages').select('*')
	]);

	return {
		tourData: tourRes.data ?? [],
		packageData: packagesRes.data ?? []
	};
};

export const actions: Actions = {
	inquiry: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('fullName')?.toString().trim();
		const email = formData.get('mail')?.toString().trim();
		const phone_number = formData.get('phoneNumber')?.toString().trim();
		const preferred_date = formData.get('date')?.toString().trim();
		const message = formData.get('message')?.toString().trim();
		const tour_id = formData.get('tour_id')?.toString().trim();

		// --- Validation ---
		if (!name || !email || !phone_number || !preferred_date || !message || !tour_id) {
			return fail(400, { error: 'All fields are required.' });
		}

		// Portuguese phone number validation
		const phoneRegex = /^(?:\+351)?\s?(9[1236]\d{7})$/;
		if (!phoneRegex.test(phone_number)) {
			return fail(400, { error: 'Invalid Portuguese phone number.' });
		}

		// --- Log the clean data ---
		console.log('✅ Clean form data:', {
			name,
			email,
			phone_number,
			preferred_date,
			message,
			tour_id
		});

		// Return this so the Svelte page receives form.success = true
		return { success: true, message: 'Form validated and logged (no DB insert).' };
	}
};
