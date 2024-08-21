import { browser } from '$app/environment';
import StorageServices from '$lib/data/db/services';
import { createStorage } from '$lib/data/db/storage';

export const prerender = true;
export const ssr = false;

export async function load() {
	if (!browser) return;
	await createStorage();
	const routines = await StorageServices.getRoutines();
	return { routines };
}
