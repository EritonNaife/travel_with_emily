import { z } from 'zod';

export const inquirySchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Name is required')
		.max(50)
		.regex(/^[\p{L}\p{M}\p{Zs}'-]+$/u, 'Invalid characters in name'),
	email: z.email('Invalid email address'),
	message: z
		.string()
		.trim()
		.min(10, 'Message must be at least 10 characters long.')
		.max(1000, 'Message must be 1000 characters or fewer.'),
	tour_id: z
		.string()
		.min(1, 'Tour ID is required')
		.max(2)
		.or(z.number().positive('Tour ID must be a positive number')),
	phone_number: z
		.string()
		.min(8, 'Phone number is too short')
		.max(20, 'Phone number is too long')
		.regex(/^[\d\s\-\+\(\)\.]+$/, 'Phone number contains invalid characters')
		.refine((val) => {
			// Remove all non-digit characters and check length
			const digits = val.replace(/\D/g, '');
			return digits.length >= 7 && digits.length <= 15;
		}, 'Phone number must contain 7-15 digits')
		.trim(),
	preferred_date: z
		.string()
		.min(1, 'Please select a preferred date')
		.refine((date) => {
			const selectedDate = new Date(date);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			return selectedDate >= today;
		}, 'Date must be today or in the future')
});

export type InquirySchema = typeof inquirySchema;
