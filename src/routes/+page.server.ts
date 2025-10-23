// src/routes/.../+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error, fail } from '@sveltejs/kit';
import { tourInquiryEmail } from '$lib/email/templates';
import { resend } from '$lib/email/resend';

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

		const phoneRegex = /^(?:\+351)?\s?(9[1236]\d{7})$/;
		if (!phoneRegex.test(phone_number)) {
			return fail(400, { error: 'Invalid Portuguese phone number.' });
		}

		console.log('📩 Received inquiry:', {
			name,
			email,
			phone_number,
			preferred_date,
			message,
			tour_id
		});

		// --- Optional: store inquiry in Supabase ---
		/*
		const { error: dbError } = await supabase.from('inquiries').insert({
			name,
			email,
			message,
			tour_id,
			phone_number,
			preferred_date
		});

		if (dbError) {
			console.error('Supabase error:', dbError);
			return fail(500, { error: 'Could not save inquiry. Please try again.' });
		}
		*/

		// --- Send email via Resend ---
		try {
			const { data, error: emailError } = await resend.emails.send({
				from: 'onboarding@resend.dev', // Must be verified in Resend
				to: 'delivered@resend.dev', // Replace with your real destination email
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
	}
};
