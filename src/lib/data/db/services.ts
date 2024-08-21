import type { Routine } from '../routines/routines';
import { routinesKey } from './config';
import { storage } from './storage';

export default class StorageServices {
	static async getRoutines(): Promise<Routine[]> {
		const routines = await storage.get(routinesKey);
		return routines || [];
	}

	static async setRoutines(routines: any) {
		try {
			return await storage.set(routinesKey, routines);
		} catch (err) {
			console.error('Error storing routines', err);
		}
	}

	static async removeRoutine(id: string): Promise<boolean> {
		try {
			const routines = await this.getRoutines();
			const newRoutines = routines.filter((r) => r.id !== id);
			const res = await storage.set(routinesKey, newRoutines);
			return res;
		} catch (err) {
			console.error('Error removing routine', err);
		}
	}

	static async addRoutine(routine: Routine) {
		try {
			const routines = await this.getRoutines();
			routines.push(routine);
			this.setRoutines(routines);
		} catch (err) {
			console.error('Error adding routine', err);
		}
	}
}
