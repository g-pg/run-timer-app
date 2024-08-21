export const ssr = false;
export const prerender = false;

import { browser } from '$app/environment';
import StorageServices from '$lib/data/db/services.js';

export async function load({ params }) {
	const id = params.routineId;

	const routines = await StorageServices.getRoutines();
	const routine = routines.find((r) => r.id === id);

	return { routine };
}
