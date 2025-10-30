import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const [packagesRes] = await Promise.all([supabase.from('packages').select('*')]);

	return {
		packageData: packagesRes.data ?? []
	};
};
