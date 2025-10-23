// src/routes/api/send/+server.ts
import { form } from '$app/server';
import { resend } from '$lib/email/resend';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { name, email, phone_number, preferred_date, message, tour_id } = await request.json();

	console.log('Received inquiry for sending mail:', {
		name,
		email,
		phone_number,
		preferred_date,
		message,
		tour_id
	});

	return json({ success: true, message: 'Inquiry received.' });
};
