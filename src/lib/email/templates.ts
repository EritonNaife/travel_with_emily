import { number } from 'zod';

// src/lib/email/templates.ts
export function tourInquiryEmail(data: {
	name: string;
	email: string;
	phone_number: string;
	preferred_date: string;
	message: string;
	tour_id: string | number;
}) {
	const escape = (text: string) => {
		const map: Record<string, string> = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return text.replace(/[&<>"']/g, (m) => map[m]);
	};

	return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #6b7280; }
        .value { color: #111827; margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Tour Inquiry</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${escape(data.name)}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${escape(data.email)}</div>
          </div>
          
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${escape(data.phone_number)}</div>
          </div>
          
          <div class="field">
            <div class="label">Preferred Date:</div>
            <div class="value">${escape(data.preferred_date)}</div>
          </div>
          
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${escape(data.message)}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
