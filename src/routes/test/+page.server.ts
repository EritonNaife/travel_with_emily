import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const { data, error } = await supabase.from('packages').select('*');

	if (error) {
		console.error('Error Loading Packages', error.message);
		return { package: [] };
	}

	return {
		package: data ?? []
	};
};
