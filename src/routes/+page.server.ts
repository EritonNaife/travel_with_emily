// src/routes/.../+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error, fail } from '@sveltejs/kit';
import { tourInquiryEmail } from '$lib/email/templates';
import { resend } from '$lib/email/resend';
import { inquirySchema } from '$lib/zod/schema';
import { da } from 'zod/locales';

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

		try {
			console.log('Received validated data:', result.data);
			await resend.emails.send({
				from: 'onboarding@resend.dev',
				to: 'delivered@resend.dev',
				subject: `New Tour Inquiry`,
				html: tourInquiryEmail({ name, email, phone_number, preferred_date, message, tour_id })
			});
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

		console.log('📩 Received inquiry:', {
			

			name,
			email,
			phone_number,
			preferred_date,
			message,
			tour_id
		});

		try {
			const { data, error: emailError } = await resend.emails.send({
				from: 'onboarding@resend.dev',
				to: 'delivered@resend.dev', 
				subject: `New Tour Inquiry`,
				html: tourInquiryEmail({
					name,
					email,
					phone_number,
					preferred_date,
					message,
					tour_id
				})
			});

			if (emailError) {
				console.error('Resend email error:', emailError);
				return fail(500, { error: 'Failed to send email. Please try again.' });
			}

			console.log('✅ Email sent via Resend:', data);
			return { success: true, message: 'Your inquiry has been submitted!' };
		} catch (err) {
			console.error('Unexpected error sending email:', err);
			return fail(500, { error: 'An unexpected error occurred while sending your inquiry.' });
		}
		
		*/

		return { success: true };
	}
};
