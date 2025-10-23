// src/routes/.../+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';
import { tourInquiryEmail } from '$lib/email/templates';
import { resend } from '$lib/email/resend';
import { inquirySchema } from '$lib/zod/schema';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

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
		const data = Object.fromEntries(formData);
		const result = inquirySchema.safeParse(data);

		if (!result.success) {
			const errors = result.error.flatten().fieldErrors;
			return fail(400, {
				data: data,
				errors: errors
			});
		}

		const { name, email, message, tour_id, phone_number, preferred_date } = result.data;

		const sanitizedMessage = purify.sanitize(message); // sanitized message for when admin dashboard is ready

		try {
			console.log('Received validated data:', result.data);

			return { success: true, message: 'Your inquiry has been submitted succefully!' };
		} catch (error) {
			console.error('Error:', error);

			return fail(500, {
				data,
				errors: { _form: ['An error ocurred please try again'] }
			});
		}

		// --- Optional: store inquiry in Supabase ---
		/*

		await resend.emails.send({
				from: 'onboarding@resend.dev',
				to: 'delivered@resend.dev',
				subject: `New Tour Inquiry`,
				html: tourInquiryEmail({ name, email, phone_number, preferred_date, message, tour_id })
			});
		*/

		return { success: true };
	}
};
