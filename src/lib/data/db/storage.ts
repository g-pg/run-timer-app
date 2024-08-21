import { browser } from '$app/environment';
import { Drivers, Storage } from '@ionic/storage';

let db: Storage;
async function createStorage() {
	if (!browser) return;
	const storage = new Storage({
		name: '__RunTimerDB',
		driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
	});
	await storage.create();
	db = storage;
}

export { db as storage, createStorage };
